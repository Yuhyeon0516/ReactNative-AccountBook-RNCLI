import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import AddUpdateScreen from '../screens/AddUpdateScreen';
import MonthlyScreen from '../screens/MonthlyScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'containedModal'}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddUpdateScreen} />
      <Stack.Screen name="Update" component={AddUpdateScreen} />
      <Stack.Screen name="Montly" component={MonthlyScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
