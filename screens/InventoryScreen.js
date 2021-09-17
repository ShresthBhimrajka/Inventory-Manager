import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Button, Keyboard, ImageBackground } from 'react-native';
import firebase from 'firebase';

import Card from '../components/Card';
import { removeItem, updateInv, updateRec } from '../DataBaseUpdate';
import Popup from '../components/Popup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton'

const InventoryScreen = ({route}) => {
    const orgname = route.params.orgname;
    const access = route.params.access;
    const empName = route.params.empName;
    const empId = route. params.empId;
    const [invData, setInvData] = useState([]);
    const [visibleUpdate, setVisibileUpdate] = useState(false);
    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [visibleRemove, setVisibileRemove] = useState(false);

    const changeHandler = ({item}) => {
        updateInv(item, newName, newId, newQuantity, empName, empId, orgname);
        setNewId('');
        setNewName('');
        setNewQuantity('');
        Keyboard.dismiss;
        setVisibileUpdate(false);
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

    const removeHandler = ({item, orgname}) => {
        removeItem(item.id, orgname);
        updateRec(item.id, item.name, item.quantity, 'removed', empName, empId, orgname);
        setVisibileRemove(false);
    };

    const emp = ({item}) =>(<View></View>);

    const admin = ({}) => (
        <TouchableOpacity onPress = {() => setVisibileRemove(true)}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Remove Item</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => (
        <Card style={styles.item}>
            <Popup visible={visibleRemove}>
                <Text>Are you Sure?</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => setVisibileRemove(false)}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeHandler({item, orgname})}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.update}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Popup>

            <Popup visible={visibleUpdate}>
                <Text>Enter the changes</Text>
                <FormInput labelValue={newId} onChangeText={(newId) => setNewId(newId)} placeholder='Id' autocapitalize='none' autocorrect='none'/>
                <FormInput labelValue={newName} onChangeText={(newName) => setNewName(newName)} placeholder='Name' autocapitalize='none' autocorrect='none'/>
                <FormInput labelValue={newQuantity} onChangeText={(newQuantity) => setNewQuantity(newQuantity)} placeholder='Quantity' keyboardType='numeric' autocorrect='none'/>
                <FormButton buttonTitle='Update Item' onPress={() => changeHandler({item})}/>
                <View style={styles.modal}>
                    <Button title='Cancel' color='red' onPress={() => setVisibileUpdate(false)}/>
                </View>   
            </Popup>
            <View style={styles.card}> 
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.quantity}</Text>
            </View>
            <View style={styles.buttons}>
                {access=='admin' ? admin({item,orgname,empName,empId}) : emp({item})}
                <TouchableOpacity onPress = {() => setVisibileUpdate(true)}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.update}>Update</Text>
                 </TouchableOpacity> 
            </View>
        </Card>
    );

    return (
        <ImageBackground style={styles.background} source={require('../assets/inventory.png')}>
        <View style={styles.screen}>
            <FlatList
                data={invData}
                renderItem={renderItem}/>   
        </View>
        </ImageBackground>
    ); 
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
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