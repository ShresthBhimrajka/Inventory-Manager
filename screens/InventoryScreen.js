import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';
import { removeItem } from '../Autherntication';

const admin = ({item}) => {
    return (
        <View style={styles.removeButton}>
            <TouchableOpacity onPress = {() => removeItem(item)}>
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
                  setInvData(data);
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
            {access=='admin' ? admin({item}) : emp({item})}
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