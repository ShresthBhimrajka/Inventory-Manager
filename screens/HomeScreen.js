import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const HomeScreen = ({navigation}) => {
    let userId = firebase.auth().currentUser.uid;  
    const [name, setName] = useState('');
    const [org, setOrg] = useState('');
    const [access, setAccess] = useState('');

    useEffect(() => {
      async function getUserInfo(){
        let docuser = await firebase.firestore().collection('allusers').doc(userId).get();
  
        if (!docuser.exists){
          Alert.alert('No user data found!')
        } 
        else {
          let dataObj = docuser.data();
          setName(dataObj.name);
          setOrg(dataObj.orgname);
          setAccess(dataObj.access);
        }
      }
      getUserInfo();
    })

    const admin = (
      <View style={styles.screen}>
          <View style={styles.touchableContainer}>

            <Text style={styles.hello} adjustsFontSizeToFit numberOfLines={1}>Welcome {name} of Organization {org}</Text>

            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Inventory')}>
              <Card style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Inventory</Text>
              </Card>
            </TouchableOpacity> 
    
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Records')}>
              <Card style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Records</Text>
              </Card>
            </TouchableOpacity> 
    
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Status')}>
              <Card style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Status</Text>
              </Card>
            </TouchableOpacity> 
          </View>
        </View>
    );

    const emp = (
      <View style={styles.screen}>
        <View style={styles.touchableContainer}>

          <Text style={styles.hello} adjustsFontSizeToFit numberOfLines={1}>Welcome {name} of Organization {org}</Text>

          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Inventory')}>
            <Card style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Inventory</Text>
            </Card>
          </TouchableOpacity> 

          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Status')}>
            <Card style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Status</Text>
            </Card>
          </TouchableOpacity> 
        </View>
      </View>
    );

    return (access == 'admin' ? admin : emp);
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
      marginBottom: '40%'
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
    },

    hello: {
      padding: 10,  
      textAlign: 'center',
      textShadowColor: 'black',
      textShadowOffset: {width: 0, height: 5},
      fontSize: 20,
      color: Colors.primaryText
    }
});

export default HomeScreen;