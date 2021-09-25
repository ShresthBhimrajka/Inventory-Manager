import React, {useState, useEffect} from 'react';
import {Image,  StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Button, Keyboard, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';

import SearchBar from './SearchBar';
import Card from '../components/Card';
import { removeItem, updateInv, updateRec, updateHistoy } from '../DataBaseUpdate';
import Popup from '../components/Popup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton'

const InventoryScreen = ({route}) => {
    const orgname = route.params.orgname;
    const access = route.params.access;
    const empName = route.params.empName;
    const empId = route. params.empId;
    const [invData, setInvData] = useState([]);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [newId, setNewId] = useState('');
    const [newName, setNewName] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [data, setData] = useState([]);
    const [visibleRemove, setVisibleRemove] = useState(false);
    const [selected, setSelected] = useState(null);
    const [visibleDetails, setVisibleDetails] = useState(false);

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

    const changeHandler = () => {
        updateInv(selected, newName, newId, newQuantity, empName, empId, orgname);
        setNewId('');
        setNewName('');
        setNewQuantity('');
        Keyboard.dismiss;
        setVisibleUpdate(false);
        setSelected(null);
    };

    const removeHandler = () => {
        removeItem(selected.id, orgname);
        updateRec(selected.id, selected.name, selected.quantity, 'removed', empName, empId, orgname);
        updateHistoy(selected.id, selected.name, selected.quantity, 'removed', empId, orgname);
        setVisibleRemove(false);
        setSelected(null);
    };

    const setRemove = ({item}) => {
        setSelected(item);
        setVisibleRemove(true);
    };

    const setUpdate = ({item}) => {
        setSelected(item);
        setVisibleUpdate(true);
    };

    const setDetails = ({item}) => {
        setSelected(item);
        setVisibleDetails(true);
    };

    const closeDetails = () => {
        setVisibleDetails(false);
        setSelected(null);
    };

    const showDetails = () => (
        <Popup visible={visibleDetails}>
            <View style={styles.card}> 
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {selected.id}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {selected.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {selected.quantity}</Text>
            </View>

            <View style={styles.modal}>
                 <Button title='Cancel' color='red' onPress={closeDetails}/>
            </View>
        </Popup>
    );

    const emp = ({item}) => (
        <View style={styles.buttons}>
            <TouchableOpacity onPress = {() => setUpdate({item})}>
                <Image style={styles.logo} source={require('../assets/edit.png')}/>
            </TouchableOpacity> 
        </View>
    );

    const admin = ({item}) => (
        <View style={styles.buttons}>
            <TouchableOpacity onPress = {() => setRemove({item})}>
                <Image style={styles.logo} source={require('../assets/remove.png')}/> 
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => setUpdate({item})}>
                <Image style={styles.logo} source={require('../assets/edit.png')}/>
            </TouchableOpacity>
        </View>  
    );

    const renderItem = ({item}) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => setDetails({item})}>
            <Card style={styles.item}>
                <View style={styles.card}> 
                    <View style={styles.item1}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name} </Text>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.quantity} </Text>
                    </View>
                </View>

                <View style={styles.buttons}>
                    {access=='admin' ? admin({item}) : emp({item})}
                </View>
            </Card>
        </TouchableOpacity>      
    );

    return (
        <ImageBackground style={styles.background} source={require('../assets/inventory.png')}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.screen}>
                    <SearchBar
                        data={data}
                        onChangeValue={(newValue)=>setData(newValue)}
                        onValueSubmitted={()=> alert(data)}/>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={invData}
                        renderItem={renderItem}/>   
            
                    <Popup visible={visibleRemove}>
                        <Text>Are you Sure?</Text>
                        <View style={styles.buttonConfirm}>
                            <TouchableOpacity onPress={() => setVisibleRemove(false)}>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={removeHandler}>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.update}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </Popup>

                    <Popup visible={visibleUpdate}>
                        <Text>Enter the changes</Text>
                        <FormInput labelValue={newId} onChangeText={(newId) => setNewId(newId)} placeholder='ID' autocapitalize='none' autocorrect='none'/>
                        <FormInput labelValue={newName} onChangeText={(newName) => setNewName(newName)} placeholder='Name' autocapitalize='none' autocorrect='none'/>
                        <FormInput labelValue={newQuantity} onChangeText={(newQuantity) => setNewQuantity(newQuantity)} placeholder='Quantity' keyboardType='numeric' autocorrect='none'/>
                        <FormButton buttonTitle='Update Item' onPress={changeHandler}/>
                        <View style={styles.modal}>
                            <Button title='Cancel' color='red' onPress={() => setVisibleUpdate(false)}/>
                        </View>   
                    </Popup>
                    
                    {visibleDetails==true ? showDetails() : <View></View>}
                </View>
            </TouchableWithoutFeedback>
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
  
    logo:{
        width:20,
        height:20,
        alignItems:'center',
        justifyContent: 'center',
    },
  
    item: {
        flex: 1,
        width: 270,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        margin: '5%'
    },

    card: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10
    },
    
    item1:{
        justifyContent:"center"
    },

    cardText: {
        textAlign: 'left',
    },

    buttons: {
        flex: 1,
        alignContent: 'flex-end',
        justifyContent: 'space-between',
    },

    modal: {
        padding: 20
    },

    remove: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },

    update: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#32cd32'
    },
    
    buttonConfirm: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '85%',
        paddingVertical: 10
    }
}); 

export default InventoryScreen;