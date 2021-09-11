import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const Data = [
    {
        id: '1',
        itemName: 'Item 1',
        itemQuantity: '999'
    },
    {
        id: '2',
        itemName: 'Item 2',
        itemQuantity: '999'
    },
    {
        id: '3',
        itemName: 'Item 3',
        itemQuantity: '999'
    },
];

/*const Data = () => {
    const [data, setData] = useState([]);
    const [orgname, setOrgName] = useState('');

    let userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        async function getUserInfo(){
          let docuser = await firebase.firestore().collection('allusers').doc(userId).get();

          if (!docuser.exists){
            Alert.alert('No user data found!')
          } 
          else {
            let dataObj = docuser.data();
            setOrgName(dataObj.orgname);
          }
          const inv = firebase.firestore().collection('organizations').doc(orgname).collection('inventory').onSnapshot(
            querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot =>{
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setData(data);
            });
            return () => inv;
        }
        getUserInfo();
    }, []);
    return data;   
}*/


const InventoryScreen = () => {
    //const data = Data();

    const renderItem = ({item}) => (
        <Card style={styles.item}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.itemName}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.itemQuantity}</Text>
        </Card>
    );

    return (
        <View style={styles.screen}>
            <FlatList
                keyExtractor={item => item.id}
                data={Data}
                renderItem={renderItem}/>   
        </View>
    ); 
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryBackgroud  
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

export default InventoryScreen;