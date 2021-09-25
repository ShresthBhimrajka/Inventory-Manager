import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import firebase from 'firebase';

import SearchBar from './SearchBar';
import Popup from '../components/Popup';
import Card from '../components/Card';

const HistoryScreen = ({route}) => {
    const orgname = route.params.orgname;
    const userId = firebase.auth().currentUser.uid;
    const [hisData, setHisData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [visibleSearch, setVisibleSearch] = useState(false);

    useEffect(() => {
        try {  
            const his = firebase.firestore().collection('organizations').doc(orgname).collection('history').doc(userId).collection('records').onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
                setHisData(data.sort(function(a,b) {
                    return parseInt(b['mil']) - parseInt(a['mil']);
                }));
            });
            return () => his;
        } 
        catch (err) {
            Alert.alert('History Error !');
        }
    }, [])
    
    const setDetails = ({item}) => {
        setVisible(true);
        setSelected(item);
    };

    const closeDetails = () => {
        setSelected(null);
        setVisible(false);
    };

    const closeSearch = () => {
        setVisibleSearch(false);
        setSearchResults([]);
        setSearch('');
    };

    const searchItem = () => {
        setVisibleSearch(true);
        const data = hisData.filter(item => {
            const itemId = item.id.toUpperCase();
            const itemName = item.name.toUpperCase();
            const searchText = search.toUpperCase();
            return (itemId.indexOf(searchText) > -1 || itemName.indexOf(searchText) > -1);
        });
        setSearchResults(data);
    };

    const showDetails = () => (
        <Popup visible={visible}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {selected.id}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {selected.name}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {selected.quantity}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Date: {selected.datetime}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>In/Ex: {selected.inex}</Text>
            <View style={styles.modal}>
                <Button title='Cancel' color='red' onPress={closeDetails}/>
            </View>
        </Popup>
    );

    const renderItem = ({item}) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => setDetails({item})}>
            <Card style={styles.item}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Date: {item.datetime}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>In/Ex: {item.inex}</Text>
            </Card>
        </TouchableOpacity>   
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <SearchBar
                    placeholdertext='Search by ID or Name'
                    data={search}
                    onChangeValue={(search)=>setSearch(search)}
                    onValueSubmitted={searchItem}/>

                <FlatList
                    keyExtractor={item => item.mil}
                    data={hisData}
                    renderItem={renderItem}/>

                {visible ? showDetails() : <View></View>}

                <Popup visible={visibleSearch}>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={searchResults}
                        renderItem={renderItem}/>
                    <TouchableOpacity onPress={closeSearch}>
                        <Text style={styles.remove}>Cancel</Text>
                    </TouchableOpacity>
                </Popup>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10  
    },

    item: {
        flex: 1,
        width: 270,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 10,
        margin: '5%'
    },

    cardText: {
        textAlign: 'left',
    },

    modal: {
        padding: 10
    },

    remove: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },
});

export default HistoryScreen;