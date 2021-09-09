import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, TouchableOpacity, Image, Button } from 'react-native';
import firebase from 'firebase';
import apiKeys from './apiKeys';

import InventoryScreen from './screens/InventoryScreen';
import RecordScreen from './screens/RecordScreen';
import StatusScreen from './screens/StatusScreen';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import Scan from './screens/Scan';
import SignUp from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignupOrgScreen from './screens/SignupOrgScreen';
import { Colors } from './assets/Colors';
import SignUpEmployee from './screens/SignupEmployeeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

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
  <TouchableOpacity style={styles.scanQR}>
    <View style={styles.scanImg} onPress={onPress}>
      {children}
    </View>
  </TouchableOpacity>
};

function navBar() {
  return (
    <Tabs.Navigator screenOtions={{tabBarStyle: {backgroundColor: 'black'}}}>
      <Tabs.Screen name='HomeScreen' component={Home} options={{headerShown: false,tabBarIcon: ({focused}) => (<View><Image source={require('./assets/homeIcon.png')}/></View>)}}/>
      <Tabs.Screen name='Scan' component={Scan} options={{headerTitleAlign: 'center', tabBarIcon: ({focused}) => (<Image source={require('./assets/scanQR.png')} resizeMode='contain' style={styles.navButton}/>), scanTouchable}}/>
      <Tabs.Screen name='Profile' component={Profile} options={{headerTitleAlign: 'center', tabBarIcon: ({focused}) => (<View><Image source={require('./assets/profileIcon.png')}/></View>)}}/>
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
