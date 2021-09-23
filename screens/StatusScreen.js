<<<<<<< Updated upstream
import React from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList } from 'react-native';
=======
import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import firebase from 'firebase';
import SearchBar from './SearchBar';
>>>>>>> Stashed changes

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

<<<<<<< Updated upstream
const Data = [
    {
        id: '1',
        itemName: 'Item 1',
        itemQuantity: '999',
        dateTimePlaced: '10.10.2021-12:12:40',
        status: 'EX'
    },
    {
        id: '2',
        itemName: 'Item 2',
        itemQuantity: '999',
        dateTimePlaced: '10.10.2021-12:12:40',
        status: 'IN'
    },
    {
        id: '3',
        itemName: 'Item 3',
        itemQuantity: '999',
        dateTimePlaced: '10.10.2021-12:12:40',
        status: 'IN'
    },
];
=======

const StatusScreen = ({route}) => {
    const orgname = route.params.orgname;
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        try {  
            const ship = firebase.firestore().collection('organizations').doc(orgname).collection('shipment').onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
                setData(data);
            });
            return () => ship;
        } 
        catch (err) {
            Alert.alert('Shipment  Error !');
        }
  }, [])

    const setDetails = ({item}) => {
        setVisible(true);
        setSelected(item);
    };

    const closeDetails = () => {
        setSelected(null);
        setVisible(false);
    }
>>>>>>> Stashed changes

const StatusScreen = () => {

    const renderItem = ({item}) => (
        <Card style={styles.item}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID: {item.id}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.itemName}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.itemQuantity}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Order Placed: {item.dateTimePlaced}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Status:   {item.status}</Text>
        </Card>
    );

    return (
        <ImageBackground style={styles.background} source={require('../assets/status.png')}>
        <View style={styles.screen}>
            <SearchBar
            data={data}
            onChangeValue={(newValue)=>setData(newValue)}
            onValueSubmitted={()=> alert(data)}/>
            <FlatList
                keyExtractor={item => item.id}
                data={Data}
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
    }
});

export default StatusScreen;