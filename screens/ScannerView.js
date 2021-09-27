import React, { useState, useEffect } from 'react';
import { Text,Image, View, StyleSheet, Button,TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from 'firebase';

import {addItem, updateHistoy, updateRec} from '../DataBaseUpdate';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Popup from '../components/Popup';

const ScannerView = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [name, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [id, setId] = useState('');
    const [desc, setDesc] = useState('');
    const [empId, setEmpId] = useState('');
    const [empName, setEmpName] = useState('');
    const [orgname, setOrgName] = useState('');
    const [visible, setVisible] = useState(false);
    const userId = firebase.auth().currentUser.uid;

    useEffect(() => {(
        async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
            addItem(id, name, quantity, desc, orgname);
            updateRec(id, name, quantity, 'Added', empName, empId, orgname);
            updateHistoy(id, name, quantity, 'Added', empId, orgname);
            setQuantity('');
            setId('');
            setItemName('');
            setDesc('');
        }
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setVisible(true);
        setId(data);
    };

    const resetHandler = () => {
        setVisible(false);
        setScanned(false);
        setQuantity('');
        setId('');
        setItemName('');
        setDesc('');
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const form = () => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Popup visible={visible}>
                <Text style={{textAlign:'center'}}>Enter item details</Text>
                <FormInput labelValue={id} onChangeText={(id) => {setId(id)}} placeholder={id ? id : 'ID'} autoCorrect={false}/>
                <FormInput labelValue={name} onChangeText={(name) => {setItemName(name)}} placeholder='Item Name' autoCorrect={false}/>
                <FormInput labelValue={quantity} onChangeText={(quantity) => {setQuantity(quantity)}} placeholder='Item Quantity' keyboardType='numeric' autoCorrect={false}/>
                <FormInput labelValue={desc} onChangeText={(desc) => {setDesc(desc)}} placeholder='Item Description' autoCorrect={false}/>
                <FormButton buttonTitle='Add' onPress={itemHandler}/>
                <View style={{padding: 10}}>
                    <TouchableOpacity onPress={resetHandler}>
                     <Text style={styles.textwhite}>Cancel<Image style={styles.logo1} source={require('../assets/cancel.png')}/></Text>
                    </TouchableOpacity>               
                </View>
            </Popup>
        </TouchableWithoutFeedback>
    );

    return (
            <View style={styles.container}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
                {scanned==true || visible? form() : <View></View>}
                <View style={styles.button}>
                    <Button title='or Enter data Manually' onPress={() => setVisible(true)}/>
                </View> 
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    button: {
        alignItems: 'center',
        marginTop: Dimensions.get('screen').height/1.5,
    },
    textwhite: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red',
        fontSize:20
    },
    logo1:{
        width:22,
        height:25,
        alignItems:'center',
        justifyContent: 'center',
    },

});

export default ScannerView;