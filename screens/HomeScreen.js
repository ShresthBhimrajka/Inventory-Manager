import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const HomeScreen = ({navigation}) => {

    const [access, setAccess] = useState('');
    const [orgname, setOrgName] = useState('');
    const [empName, setEmpName] = useState('');
    const [empId, setEmpId] = useState('');
    let userId = firebase.auth().currentUser.uid;  

    useEffect(() => {
        async function getUserInfo(){
            let docuser = await firebase.firestore().collection('allusers').doc(userId).get();
            if (!docuser.exists){
                Alert.alert('No user data found!')
            } 
            else {
                let dataObj = docuser.data();
                setAccess(dataObj.access);
                setOrgName(dataObj.orgname);
                setEmpName(dataObj.name);
                setEmpId(userId);
            }
        }
        getUserInfo();
    })

    const admin = (
      <View style={styles.screen}>
        <View style={styles.touchableContainerAdmin}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Inventory', {orgname: orgname, access: access, empId: empId, empName: empName})}>
            <Card style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Inventory</Text>
            </Card> 
          </TouchableOpacity> 

          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Records', {orgname: orgname})}>
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
        <View style={styles.touchableContainerEmp}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Inventory', {orgname: orgname, access: access, empName: empName, empId: empId})}>
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

    return (access == 'admin' ? admin : emp)
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryBackgroud
    },

    touchableContainerAdmin: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 30,
      marginBottom: '65%'
    },

    touchableContainerEmp: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 30,
      marginBottom: '90%'
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

    navButton: {
      width: 30,
      height: 30
    }
});

export default HomeScreen;