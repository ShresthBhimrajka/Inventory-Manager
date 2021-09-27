import React, {useState, useEffect} from 'react';
import {ImageBackground,Image, StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Keyboard} from 'react-native';
import firebase from 'firebase';

import SearchBar from './SearchBar';
import Card from '../components/Card';
import { removeUser, promote } from '../Authentication';
import Popup from '../components/Popup';

const admin = ({item}) => {
    return (
        <View></View>
    );
};

const ViewUsers = ({route}) => {
    const orgname = route.params.orgname;
    const [users, setUsers] = useState([]);
    const [visibleRemove, setVisibleRemove] = useState(false);
    const [visiblePromote, setVisiblePromote] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [visibleSearch, setVisibleSearch] = useState(false);

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

    const removeHandler = ({item, orgname}) => {
        removeUser(item,orgname);
        setVisibleRemove(false);
    };

    const promoteHandler = ({item, orgname}) => {
        promote(item,orgname);
        setVisiblePromote(false);
    };

    const closeSearch = () => {
        setVisibleSearch(false);
        setSearchResults([]);
        setSearch('');
    };

    const searchItem = () => {
        setVisibleSearch(true);
        const data = users.filter(item => {
            const itemId = item.id.toUpperCase();
            const itemName = item.name.toUpperCase();
            const searchText = search.toUpperCase();
            return (itemId == searchText || itemName.indexOf(searchText) > -1);
        });
        setSearchResults(data);
    };

    const emp = ({item,orgname}) => (
        <View style={styles.buttons}>
            <Popup visible={visibleRemove}>
                <Text style={{textAlign:'center'}}>Are you Sure?</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => setVisibleRemove(false)}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeHandler({item, orgname})}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.promote}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Popup>

            <Popup visible={visiblePromote}>
                <Text style={{textAlign:'center'}}>Are you Sure?</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => setVisiblePromote(false)}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => promoteHandler({item, orgname})}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.promote}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Popup>

            <TouchableOpacity onPress={() => setVisibleRemove(true)}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.remove}>Remove Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisiblePromote(true)}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.promote}>Make Admin</Text>
            </TouchableOpacity>
        </View>
    );

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

                <SearchBar
                    placeholdertext='Search by ID or Name'
                    data={search}
                    onChangeValue={(search) => setSearch(search)}
                    onValueSubmitted={searchItem}/>

                <FlatList
                    data={users}
                    renderItem={renderItem}/>  

                <Popup visible={visibleSearch}>
                    <TouchableOpacity onPress={closeSearch}>
                        <Text style={styles.remove1}>.<Image style={styles.close} source={require('../assets/close1.png')}/></Text>
                
                    </TouchableOpacity>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={searchResults}
                        renderItem={renderItem}/>
                </Popup> 
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },

    item: {
        flex: 1,
        width: 270,
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
        color:'red'
    },

    remove1: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },

    close:{
        width:50,
        height:40,
        alignItems:'center',
        justifyContent: 'center',
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
        width: '95%',
        paddingVertical: 10
    }
});

export default ViewUsers;