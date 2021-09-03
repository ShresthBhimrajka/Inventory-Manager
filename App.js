import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import InventoryScreen from './screens/InventoryScreen';
import RecordScreen from './screens/RecordScreen';
import StatusScreen from './screens/StatusScreen';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import Scan from './screens/Scan';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function Home() {
  return(
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={HomeScreen} options={{headerTitleAlign: 'center'}}/>
      <HomeStack.Screen name='Inventory' component={InventoryScreen} options={{headerTitleAlign: 'center'}}/>
      <HomeStack.Screen name='Records' component={RecordScreen} options={{headerTitleAlign: 'center'}}/>
      <HomeStack.Screen name='Status' component={StatusScreen} options={{headerTitleAlign: 'center'}}/>
    </HomeStack.Navigator>
  );
}

const scanTouchable = ({children, onPress}) => {
  <TouchableOpacity style={StyleSheet.scanQR}>
    <View style={styles.scanImg} onPress={onPress}>
      {children}
    </View>
  </TouchableOpacity>
};

function navBar() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='HomeScreen' component={Home} options={{headerShown: false, tabBarIcon: ({focused}) => (<View><Image source={require('./assets/homeIcon.png')}/></View>)}}/>
      <Tabs.Screen name='Scan' component={Scan} options={{headerTitleAlign: 'center', tabBarIcon: ({focused}) => (<Image source={require('./assets/scanQR.png')} resizeMode='contain' style={styles.navButton}/>), scanTouchable}}/>
      <Tabs.Screen name='Profile' component={Profile} options={{headerTitleAlign: 'center', tabBarIcon: ({focused}) => (<View><Image source={require('./assets/profileIcon.png')}/></View>)}}/>
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='NavBar' component={navBar} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scanQR: {
    top: -10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scanImg: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  navButton: {
    width: 50,
    height: 50
  }
});
