import {View, useWindowDimensions} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Header} from '../components/Header/Header';
import useAccountBookHistory from '../hooks/useAccountBookHistory';
import {StackedBarChart} from 'react-native-chart-kit';
import {useRootNavigation} from '../navigations/RootNavigation';

export default function MonthlyScreen() {
  const navigation = useRootNavigation();
  const {getMontlyAverage} = useAccountBookHistory();
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);
  const {width} = useWindowDimensions();

  const getAverage = useCallback(async () => {
    const result = await getMontlyAverage();
    setAverage(result);
  }, [getMontlyAverage]);

  useEffect(() => {
    getAverage();
  }, [getAverage]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Monthly Screen" />
        <Header.Icon
          iconName="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StackedBarChart
          data={{
            labels: average.map(item => `${item.month + 1}월`),
            legend: ['사용', '수입'],
            data: average.map(item => item.data),
            barColors: ['red', 'blue'],
          }}
          hideLegend
          width={width}
          height={220}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'lightgray',
            backgroundGradientTo: 'gray',
            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          }}
        />
      </View>
    </View>
  );
}
