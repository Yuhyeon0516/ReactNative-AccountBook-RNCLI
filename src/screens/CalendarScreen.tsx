import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Calendar} from 'react-native-calendars';
import {convertToDateString} from '../utils/DataUtil';

export default function CalendarScreen() {
  const navigation = useRootNavigation<'Calendar'>();
  const route = useRootRoute<'Calendar'>();
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  const maxDate = today.getTime();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="날짜 선택" />
        <Header.Icon
          iconName="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>
      <Calendar
        onDayPress={day => {
          route.params.onSelectDay(day.timestamp);
          navigation.goBack();
        }}
        maxDate={convertToDateString(maxDate)}
      />
    </View>
  );
}
