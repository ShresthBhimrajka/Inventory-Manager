import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import firebase from 'firebase';

export default function AuthLoadingScreen({ navigation }) {
  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.push('NavBar');
        } else {
          navigation.replace('Login');
        }
      });
    }
  );

  return (
    <View>
      <ActivityIndicator size='large' />
    </View>
  );
}
