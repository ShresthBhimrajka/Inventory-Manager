import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';
import { removeItem, updateInv } from '../DataBaseUpdate';

const admin = ({item,orgname,empName,empId}) => {
    return (
        
        <View style={styles.removeButton}>
            <TouchableOpacity onPress = {() => removeItem(item,orgname,empName,empId)}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Remove Item</Text>
            </TouchableOpacity>
        </View>
        
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
            <View style={styles.card}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.quantity}</Text>
            </View>
            {access=='admin' ? admin({item,orgname,empName,empId}) : emp({item})}
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 10,
        margin: '5%'
    },

    cardText: {
        textAlign: 'left',
    },

    card: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10
    },

    remove: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },

    removeButton: {
        paddingHorizontal: 80
    }
}); 

export default InventoryScreen;