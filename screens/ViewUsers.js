import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList, Alert, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';
import { removeUser, promote } from '../Authentication';
import Popup from '../components/Popup';

const emp = ({item,orgname}) => {
    return (
        <View style={styles.buttons}>
            <TouchableOpacity onPress={() => removeUser(item, orgname)}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Remove Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => promote(item, orgname)}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.promote}>Make Admin</Text>
            </TouchableOpacity>
        </View>
    );
};

const admin = ({item}) => {
    return (
        <View></View>
    );
};

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
            <View style={styles.card}> 
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Email: {item.email}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Phone: {item.phone}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Access: {item.access}</Text>
            </View>
            {item.access=='admin' ? admin({item}) : emp({item,orgname})}
        </Card>
    );

    return (
        <ImageBackground style={styles.background} source={require('../assets/viewusers.png')}>
        <View style={styles.screen}>
            <Text style={styles.heading}>Users</Text>
            <FlatList
                data={users}
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

    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },

    remove: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },

    promote: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#32cd32'
    },
    
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '85%'
    }
});

export default ViewUsers;