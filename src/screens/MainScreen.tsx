import {FlatList, View} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../components/Header/Header';
import {AccountBookHistory} from '../type/AccountBookHistory';
import AccountHistoryList from '../components/AccountHistoryList';
import {useRootNavigation} from '../navigations/RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../components/CustomButton';
import {Icon} from '../components/Icons';

const now = new Date().getTime();

export default function MainScreen() {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const [list, setList] = useState<AccountBookHistory[]>([
    {
      id: 0,
      type: '사용',
      price: 10000,
      comment: 'Test01',
      date: now,
      createdAt: now,
      updatedAt: now,
      photoUrl: null,
    },
    {
      id: 1,
      type: '수입',
      price: 20000,
      comment: 'Test02',
      date: now,
      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },
  ]);

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
