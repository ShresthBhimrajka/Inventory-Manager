import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const ViewUsers = ({route}) => {
    const orgname = route.params.orgname;
    const [users, setUsers] = useState([]);

    useEffect(() => {
            try {  
                const data = firebase.firestore().collection('organizations').doc(orgname).collection('users').onSnapshot(querySnapshot => {
                    const data = [];
                    querySnapshot.forEach(documentSnapshot => {
                        data.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                        });
                    });
                    setUsers(data);
                });
                return () => data;
            } 
            catch (err) {
                Alert.alert('User Info Error !');
            }
    }, [])

    const renderItem = ({item}) => (
        <Card style={styles.item}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Email: {item.email}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Phone: {item.phone}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Access: {item.access}</Text>
        </Card>
    );

    return (
        <View style={styles.screen}>
            <Text style={styles.heading}>Users</Text>
            <FlatList
                data={users}
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

    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
});

export default ViewUsers;