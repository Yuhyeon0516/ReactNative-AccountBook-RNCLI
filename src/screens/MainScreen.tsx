import {FlatList, View} from 'react-native';
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

export default function MainScreen() {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const {getList} = useAccountBookHistory();
  const [list, setList] = useState<AccountBookHistory[]>([]);

  const fetchList = useCallback(async () => {
    const data = await getList();

    setList(data);
  }, [getList]);

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
