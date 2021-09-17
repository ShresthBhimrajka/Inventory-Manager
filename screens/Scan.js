import React, {useState, useEffect} from 'react';
import {ImageBackground, View, Text, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import firebase from 'firebase';

import { addItem, updateRec } from '../DataBaseUpdate';
import { Colors } from '../assets/Colors';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton'

const Scan = () => {
    const [name, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [id, setId] = useState('');
    const [empId, setEmpId] = useState('');
    const [empName, setEmpName] = useState('');
    const [orgname, setOrgName] = useState('');
    const userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        async function getUserInfo(){
            let docuser = await firebase.firestore().collection('allusers').doc(userId).get();
            if (!docuser.exists){
                Alert.alert('No user data found!')
            } 
            else {
                let dataObj = docuser.data();
                setEmpId(userId);
                setEmpName(dataObj.name);
                setOrgName(dataObj.orgname);
            }
        }
        getUserInfo();
    })

    const itemHandler = () => {
        if(!name) {
            Alert.alert('Enter the item name');
        }
        else if(!id) {
            Alert.alert('Enter item id');
        }
        else if(!quantity) {
            Alert.alert('Enter the quantity');
        }
        else{
            addItem(id, name, quantity, orgname);
            updateRec(id, name, quantity, 'in', empName, empId, orgname);
            setQuantity('');
            setId('');
            setItemName('');
        }
    };

    return (
        <ImageBackground style={styles.background} source={require('../assets/scan.png')}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.screen}>
                    <Card >
                        <Text>Enter item details</Text>
                        <FormInput labelValue={id} onChangeText={(id) => {setId(id)}} placeholder='Item ID' autoCorrect={false}/>
                        <FormInput labelValue={name} onChangeText={(name) => {setItemName(name)}} placeholder='Item Name' autoCorrect={false}/>
                        <FormInput labelValue={quantity} onChangeText={(quantity) => {setQuantity(quantity)}} placeholder='Item Quantity' keyboardType='numeric' autoCorrect={false}/>
                        <FormButton buttonTitle='Add' onPress={itemHandler}/>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
            </ImageBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
        padding: 30
    },
    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
});

export default Scan;