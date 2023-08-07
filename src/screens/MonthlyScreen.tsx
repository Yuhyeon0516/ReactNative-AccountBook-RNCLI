import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';

export default function MonthlyScreen() {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Monthly Screen" />
        <Header.Icon iconName="close" onPress={() => {}} />
      </Header>
    </View>
  );
}
