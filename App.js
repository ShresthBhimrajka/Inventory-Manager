import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity, Image, Button, Alert } from 'react-native';
import firebase from 'firebase';
import apiKeys from './apiKeys';

import InventoryScreen from './screens/InventoryScreen';
import RecordScreen from './screens/RecordScreen';
import StatusScreen from './screens/StatusScreen';
import HomeScreen from './screens/HomeScreen';
import ScannerView from './screens/ScannerView';
import SignUp from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignUpEmployee from './screens/SignupEmployeeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function Home() {
  return(
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen  name='Home' component={HomeScreen} options={{headerTitleAlign: 'center'}}/>
      <HomeStack.Screen name='Inventory' component={InventoryScreen} options={{headerTitleAlign: 'center'}}/>
      <HomeStack.Screen name='Records' component={RecordScreen} options={{headerTitleAlign: 'center'}}/>
      <HomeStack.Screen name='Shipping' component={StatusScreen} options={{headerTitleAlign: 'center'}}/>
      <HomeStack.Screen name='History' component={HistoryScreen} options={{headerTitleAlign: 'center'}}/>
    </HomeStack.Navigator>
  );
}

const scanTouchable = ({children, onPress}) => {
  <TouchableOpacity style={styles.scanQR}>
    <View style={styles.scanImg} onPress={onPress}>
      {children}
    </View>
  </TouchableOpacity>
};

function navBar() {
  return (
    <Tabs.Navigator screenOtions={{tabBarStyle: {backgroundColor: 'black'}}}>
      <Tabs.Screen name='HomeScreen' component={Home} options={{title: 'Home', headerShown: false,tabBarIcon: ({focused}) => (<View><Image style={{width:50, height:50}} source={require('./assets/homeIcon.png')}/></View>)}}/>
      <Tabs.Screen name='Scan' component={ScannerView} options={{headerTitleAlign: 'center', tabBarIcon: ({focused}) => (<Image source={require('./assets/scanQR.png')} resizeMode='contain' style={styles.navButton}/>), scanTouchable}}/>
      <Tabs.Screen name='ProfileScreen' component={ProfileScreen} options={{title: 'Profile', headerTitleAlign: 'center', tabBarIcon: ({focused}) => (<View><Image style={{width:50, height:50}} source={require('./assets/profileIcon.png')}/></View>)}}/>
    </Tabs.Navigator>
  );
}

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.FirebaseConfigs);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='NavBar' component={navBar} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Loading' component={AuthLoadingScreen} options={{headerShown: false}}/>
        <Stack.Screen name='SignupEmployee' component={SignUpEmployee} options={{headerShown: false}}/>
        <Stack.Screen name='SignupAdmin' component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name='ForgotPassword' component={ResetPasswordScreen} options={{headerShown: false}}/>
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
    width: 30,
    height: 30,
    borderRadius: 50
  },

  navButton: {
    width: 30,
    height: 30
  }
});
