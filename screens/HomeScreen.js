import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import { useFonts } from 'expo-font';

import Card from '../components/Card';

const HomeScreen = ({navigation}) => {
    const [access, setAccess] = useState('');
    const [orgname, setOrgName] = useState('');
    const [empName, setEmpName] = useState('');
    const [empId, setEmpId] = useState('');
	/*const [loaded] = useFonts({
      bold: require('../assets/fonts/GemunuLibre-Bold.ttf'),
      extrabold: require('../assets/fonts/GemunuLibre-ExtraBold.ttf'),
      extralight: require('../assets/fonts/GemunuLibre-ExtraLight.ttf'),
      light: require('../assets/fonts/GemunuLibre-Light.ttf'),
      medium: require('../assets/fonts/GemunuLibre-Medium.ttf'),
      regular: require('../assets/fonts/GemunuLibre-Regular.ttf'),
      semibold: require('../assets/fonts/GemunuLibre-SemiBold.ttf'),
    });
    if (!loaded) {
      return null;
    }*/
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
      <ImageBackground style={styles.background} source={require('../assets/home.png')}>
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
                  
                  <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Status', {orgname: orgname})}>
                      <Card style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>Status</Text>
                      </Card>
                  </TouchableOpacity> 

                  <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('History', {orgname: orgname})}>
                      <Card style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>History</Text>
                      </Card>
                  </TouchableOpacity> 
              </View>
          </View>
      </ImageBackground>
    );

    const emp = (
      <ImageBackground style={styles.background} source={require('../assets/home.png')}>  
          <View style={styles.screen}>
              <View style={styles.touchableContainerEmp}>
                
                  <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Inventory', {orgname: orgname, access: access, empName: empName, empId: empId})}>
                      <Card style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>Inventory</Text>
                      </Card>
                  </TouchableOpacity> 

                  <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('History', {orgname: orgname})}>
                      <Card style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>History</Text>
                      </Card>
                  </TouchableOpacity> 

                  <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Status', {orgname: orgname})}>
                      <Card style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>Shipment</Text>
                      </Card>
                  </TouchableOpacity> 
              </View>
          </View>
      </ImageBackground>
    );

    return (access == 'admin' ? admin : emp)
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
  
    background:{
      flex:1,
      justifyContent:'flex-end',
      alignItems:'center',
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
      height: 70,
      width: 250,
      maxWidth: '70%',
      backgroundColor: "#ffee90"
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