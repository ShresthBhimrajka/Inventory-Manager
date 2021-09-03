import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InventoryScreen from './screens/InventoryScreen';
import RecordScreen from './screens/RecordScreen';
import StatusScreen from './screens/StatusScreen';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name='Home' component={HomeScreen} options={{title: 'Home', headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Inventory' component={InventoryScreen} options={{title: 'Inventory', headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Records' component={RecordScreen} options={{title: 'Records', headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Status' component={StatusScreen} options={{title: 'Status', headerTitleAlign: 'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
