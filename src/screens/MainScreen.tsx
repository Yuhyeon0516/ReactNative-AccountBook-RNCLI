import {FlatList, View} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../components/Header/Header';
import {AccountBookHistory} from '../type/AccountBookHistory';
import AccountHistoryList from '../components/AccountHistoryList';
import {useRootNavigation} from '../navigations/RootNavigation';

const now = new Date().getTime();

export default function MainScreen() {
  const navigation = useRootNavigation<'Main'>();
  const [list, setList] = useState<AccountBookHistory[]>([
    {
      id: 0,
      type: '사용',
      price: 10000,
      comment: 'Test01',
      createdAt: now,
      updateAt: now,
      photoUrl: null,
    },
    {
      id: 1,
      type: '수입',
      price: 20000,
      comment: 'Test02',
      createdAt: now,
      updateAt: now,
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
    </View>
  );
}
