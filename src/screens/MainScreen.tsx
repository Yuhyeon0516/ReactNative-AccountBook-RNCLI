import {FlatList, View, useWindowDimensions} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Header} from '../components/Header/Header';
import {AccountBookHistory} from '../type/AccountBookHistory';
import AccountHistoryList from '../components/AccountHistoryList';
import {useRootNavigation} from '../navigations/RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../components/CustomButton';
import {Icon} from '../components/Icons';
import useAccountBookHistory from '../hooks/useAccountBookHistory';
import {useFocusEffect} from '@react-navigation/native';
import {StackedBarChart} from 'react-native-chart-kit';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';

export default function MainScreen() {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const {getList, getMontlyAverage} = useAccountBookHistory();
  const [list, setList] = useState<AccountBookHistory[]>([]);
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);
  const {width} = useWindowDimensions();

  const fetchList = useCallback(async () => {
    const data = await getList();
    setList(data);

    const monthlyAverage = await getMontlyAverage();
    setAverage(monthlyAverage);
  }, [getList, getMontlyAverage]);

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [fetchList]),
  );

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main Screen" />
      </Header>
      <FlatList
        data={list}
        ListHeaderComponent={
          <CustomButton onPress={() => navigation.push('Montly')}>
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography fontSize={16} color="gray">
                이번달 총 사용금액
              </Typography>
              <Spacer space={12} />
              <Typography fontSize={24}>
                {average.length && average[average.length - 1].data[0]
                  ? average[average.length - 1].data[0].toString()
                  : '0'}
                만원
              </Typography>
              <Spacer space={32} />

              <Typography fontSize={16} color="gray">
                이번달 총 수입금액
              </Typography>
              <Spacer space={12} />
              <Typography fontSize={24}>
                {average.length && average[average.length - 1].data[1]
                  ? average[average.length - 1].data[1].toString()
                  : '0'}
                만원
              </Typography>
            </View>
          </CustomButton>
        }
        renderItem={({item}) => {
          return (
            <AccountHistoryList
              item={item}
              onPressItem={() => {
                navigation.push('Detail', {item: item});
              }}
            />
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12 + safeAreaInset.bottom,
        }}>
        <CustomButton
          onPress={() => {
            navigation.push('Add');
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon iconName="add" size={30} color="white" />
          </View>
        </CustomButton>
      </View>
    </View>
  );
}
