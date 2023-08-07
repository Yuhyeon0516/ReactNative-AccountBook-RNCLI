import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigations/RootNavigation';

export default function DetailScreen() {
  const navigation = useRootNavigation();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail Screen" />
        <Header.Icon
          iconName="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>
    </View>
  );
}
