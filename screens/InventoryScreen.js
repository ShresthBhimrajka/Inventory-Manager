import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Button, Keyboard } from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';
import { removeItem, updateInv } from '../DataBaseUpdate';
import Popup from '../components/Popup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton'

const admin = ({item,orgname,empName,empId}) => {
    return (
            <TouchableOpacity onPress = {() => removeItem(item,orgname,empName,empId)}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Remove Item</Text>
            </TouchableOpacity>
    );
};

const emp = ({item}) => {
    return (
        <View></View>
    );
};

const InventoryScreen = ({route}) => {
    const orgname = route.params.orgname;
    const access = route.params.access;
    const empName = route.params.empName;
    const empId = route. params.empId;
    const [invData, setInvData] = useState([]);
    const [visible, setVisibile] = useState(false);
    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    const changeHandler = ({item}) => {
        updateInv(item, newName, newId, newQuantity, empName, empId, orgname);
        setNewId('');
        setNewName('');
        setNewQuantity('');
        Keyboard.dismiss;
        setVisibile(false);
    };

    useEffect(() => {
          try {  
              const inv = firebase.firestore().collection('organizations').doc(orgname).collection('inventory').onSnapshot(querySnapshot => {
                  const data = [];
                  querySnapshot.forEach(documentSnapshot => {
                      data.push({
                          ...documentSnapshot.data(),
                          key: documentSnapshot.id
                      });
                  });
                  setInvData(data.sort(function(a,b) {
                        return ((a['name'] < b['name']) ? -1 : ((a['name'] > b['name']) ? 1 : 0));
                        }));
              });
              return () => inv;
          } 
          catch (err) {
              Alert.alert('Inventory Error !');
          }
    }, [])

    const renderItem = ({item}) => (
        <Card style={styles.item}>
            <Popup visible={visible}>
                <Text>Enter the changes</Text>
                <FormInput labelValue={newId} onChangeText={(newId) => setNewId(newId)} placeholder='Id' autocapitalize='none' autocorrect='none'/>
                <FormInput labelValue={newName} onChangeText={(newName) => setNewName(newName)} placeholder='Name' autocapitalize='none' autocorrect='none'/>
                <FormInput labelValue={newQuantity} onChangeText={(newQuantity) => setNewQuantity(newQuantity)} placeholder='Quantity' keyboardType='numeric' autocorrect='none'/>
                <FormButton buttonTitle='Update Item' onPress={() => changeHandler({item})}/>
                <View style={styles.modal}>
                    <Button title='Cancel' color='red' onPress={() => setVisibile(false)}/>
                </View>   
            </Popup>
            <View style={styles.card}> 
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.quantity}</Text>
            </View>
            <View style={styles.buttons}>
                {access=='admin' ? admin({item,orgname,empName,empId}) : emp({item})}
                <TouchableOpacity onPress = {() => setVisibile(true)}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.update}>Update</Text>
                 </TouchableOpacity> 
            </View>
        </Card>
    );

    return (
        <View style={styles.screen}>
            <FlatList
                data={invData}
                renderItem={renderItem}/>   
        </View>
    ); 
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryBackgroud,
        padding: 10
    },

    item: {
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        margin: '5%'
    },

    card: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10
    },

    cardText: {
        textAlign: 'left',
    },

    remove: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },

    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '85%'
    },

    update: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#32cd32'
    },

    modal: {
        padding: 20
    }
}); 

export default InventoryScreen;