import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Card from '../components/Card';

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
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
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: '70%'
    },
  
    buttonContainer: {
      height: 100,
      backgroundColor: '#1e90ff'
    },
  
    buttonText: {
      fontSize: 22,
      color: 'black'
    }
});

export default HomeScreen;