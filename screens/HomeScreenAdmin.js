import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const HomeScreenAdmin = ({navigation}) => {
    return (
        <View style={styles.screen}>
          <View style={styles.touchableContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.push('Inventory')}>
              <Card style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Inventory</Text>
              </Card>
            </TouchableOpacity> 
    
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.push('Records')}>
              <Card style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Records</Text>
              </Card>
            </TouchableOpacity> 
    
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.push('Status')}>
              <Card style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Status</Text>
              </Card>
            </TouchableOpacity> 
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryBackgroud
    },

    touchableContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: '65%'
    },
  
    buttonContainer: {
      height: 100,
      width: 300,
      maxWidth: '70%',
      backgroundColor: Colors.homeTouchable
    },
  
    buttonText: {
      fontSize: 22,
      color: 'black'
    }
});

export default HomeScreenAdmin;