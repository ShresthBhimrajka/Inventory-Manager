import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import firebase from 'firebase';

import Popup from '../components/Popup';
import Card from '../components/Card';

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

    const showDetails = () => (
        <Popup visible={visible}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID: {selected.id}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {selected.name}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {selected.quantity}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Order Placed: {selected.datetime}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Status:   {selected.status}</Text>
            <View style={styles.modal}>
                <Button title='Cancel' color='red' onPress={closeDetails}/>
            </View>
        </Popup>
    );

    const renderItem = ({item}) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => setDetails({item})}>
            <Card style={styles.item}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID: {item.id}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.quantity}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Order Placed: {item.datetime}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Status:   {item.status}</Text>
            </Card>
        </TouchableOpacity>       
    );

    return (
        <ImageBackground style={styles.background} source={require('../assets/status.png')}>
        <View style={styles.screen}>
            <FlatList
                keyExtractor={item => item.id}
                data={data}
                renderItem={renderItem}/>
            {visible ? showDetails() : <View></View>}
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
    
    modal: {
        padding: 20
    }
});

export default StatusScreen;