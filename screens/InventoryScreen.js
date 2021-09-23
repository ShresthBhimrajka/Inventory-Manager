import React, {useState, useEffect} from 'react';
import {Image,  StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Button, Keyboard, ImageBackground } from 'react-native';
import firebase from 'firebase';
<<<<<<< Updated upstream

import { Colors } from '../assets/Colors';
=======
import SearchBar from './SearchBar';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

    const changeHandler = ({item}) => {
        updateInv(item, newName, newId, newQuantity, empName, empId, orgname);
        setNewId('');
        setNewName('');
        setNewQuantity('');
        Keyboard.dismiss;
        setVisibile(false);
    };
=======
    const [visibleRemove, setVisibleRemove] = useState(false);
    const [selected, setSelected] = useState(null);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [data, setData] = useState([]);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            <View style={styles.buttons}>
                {access=='admin' ? admin({item,orgname,empName,empId}) : emp({item})}
                <TouchableOpacity onPress = {() => setVisibile(true)}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.update}>Update</Text>
                 </TouchableOpacity> 
            </View>
        </Card>
=======
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
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id} </Text>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name} </Text>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.quantity} </Text>
                </View>
                </View>
                <View style={styles.item1}>
                {access=='admin' ? admin({item}) : emp({item})}
                </View>
                </Card>
        </TouchableOpacity>      
>>>>>>> Stashed changes
    );

    return (
        <ImageBackground style={styles.background} source={require('../assets/inventory.png')}>
        <View style={styles.screen}>
        <SearchBar
            data={data}
            onChangeValue={(newValue)=>setData(newValue)}
            onValueSubmitted={()=> alert(data)}/>
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
    logo:{
        width:20,
        height:20,
        alignItems:'center',
        justifyContent: 'center',
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
        padding: 10,
        
        
    },
    item1:{
        width:'50%',
        flexDirection: "row",
        justifyContent:"center"
        //flexWrap: 'wrap',
    },

    cardText: {
        textAlign: 'left',
    },

    /*remove: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },*/

    buttons: {
        //width:"50%",
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        //width: '85%'
    },

    /*update: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#32cd32'
    },*/

    modal: {
        padding: 20
    }
}); 

export default InventoryScreen;