import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, TouchableWithoutFeedback, Keyboard, Image, Switch } from 'react-native';
import firebase from 'firebase';

import { addShipment, updateStatus } from '../DataBaseUpdate';
import SearchBar from './SearchBar';
import Popup from '../components/Popup';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const StatusScreen = ({route}) => {
    const orgname = route.params.orgname;
    const empname = route.params.empName;
    const empid = route.params.empId;
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [visibleSearch, setVisibleSearch] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [id, setId] = useState('');
    const [desc, setDesc] = useState('');
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [status, setStatus] = useState('');

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
                setData(data.sort(function(a,b) {
                    return parseInt(b['mil']) - parseInt(a['mil']);
                }));
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
    };

    const closeSearch = () => {
        setVisibleSearch(false);
        setSearchResults([]);
        setSearch('');
    };

    const searchItem = () => {
        setVisibleSearch(true);
        const res = data.filter(item => {
            const itemId = item.id.toUpperCase();
            const itemName = item.name.toUpperCase();
            const searchText = search.toUpperCase();
            return (itemId.indexOf(searchText) > -1 || itemName.indexOf(searchText) > -1);
        });
        setSearchResults(res);
    };

    const closeAdd = () => {
        setVisibleAdd(false);
        setId('');
        setName('');
        setQuantity('');
        setDesc('');
    };

    const addHandler = () => {
        addShipment(id, name, quantity, desc, empname, empid, orgname);
        setVisibleAdd(false);
        setId('');
        setName('');
        setQuantity('');
        setDesc('');
    };

    const setUpdate = ({item}) => {
        setSelected(item);
        setVisibleUpdate(true);
    };

    const closeUpdate = () => {
        setSelected(null);
        setVisibleUpdate(false);
    };

    const updateHandler = () => {
        updateStatus(selected, status, orgname, empname, empid);
        setSelected(null);
        setVisibleUpdate(false);
    }

    const showDetails = () => (
        <Popup visible={visible}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID: {selected.id}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {selected.name}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {selected.quantity}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Order Placed: {selected.datetime}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Status:   {selected.status}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Employee Name:   {selected.empname}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Employee ID:   {selected.empid}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>{selected.desc}</Text>
            <View style={styles.modal}>
                <TouchableOpacity onPress={closeDetails}>
                    <Image style={styles.close} source={require('../assets/close.png')}/>
                </TouchableOpacity>
            </View>
        </Popup>
    );

    const renderItem = ({item}) => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => setDetails({item})}>
            <Card style={styles.item}>
               
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Order Placed: {item.datetime}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText1}>Status:   {item.status}</Text>
               
                <TouchableOpacity onPress = {() => setUpdate({item})}>
                    <Image style={styles.logo} source={require('../assets/edit.png')}/>
                </TouchableOpacity>
               
            </Card>
        </TouchableOpacity>       
    );
   

    return (
        <ImageBackground style={styles.background} source={require('../assets/shipping.png')}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.screen}>
                    <SearchBar
                        placeholdertext='Search by ID or Name'
                        data={search}
                        onChangeValue={(search) => setSearch(search)}
                        onValueSubmitted={searchItem}/>
                    
                    <View style={styles.table}>
                        <Button title='Add Shipment' color='green' onPress={() => setVisibleAdd(true)}/>
                    </View>

                    <FlatList
                        keyExtractor={item => item.id}
                        data={data}
                        renderItem={renderItem}/>

                    {visible ? showDetails() : <View></View>}

                    <Popup visible={visibleSearch}>
                        <TouchableOpacity onPress={closeSearch}>
                            <Text style={styles.remove}>Close</Text>
                        </TouchableOpacity>
                        <FlatList
                            keyExtractor={item => item.id}
                            data={searchResults}
                            renderItem={renderItem}/>      
                    </Popup>

                    <Popup visible={visibleAdd}>
                        <FormInput labelValue={id} onChangeText={(id) => setId(id)} placeholder='Item ID' autocorrect={false} autoCapitalize='none'/>
                        <FormInput labelValue={name} onChangeText={(name) => setName(name)} placeholder='Item Name' autocorrect={false} autoCapitalize='words'/>
                        <FormInput labelValue={quantity} onChangeText={(quantity) => setQuantity(quantity)} placeholder='Item Quantity' keyboardType='numeric' autocorrect={false}/>
                        <FormInput labelValue={desc} onChangeText={(desc) => setDesc(desc)} placeholder='Item Description' autocorrect={false} autoCapitalize='Sentences'/>
                        <FormButton buttonTitle='Add Shipment' onPress={addHandler}/>
                        <TouchableOpacity onPress={closeAdd}>
                            <Image style={styles.logo1} source={require('../assets/cancel.png')}/>
                        </TouchableOpacity>
                    </Popup>

                    <Popup visible={visibleUpdate}>
                        <View style={styles.table}>
                            <TouchableOpacity onPress={closeUpdate}>
                                <Text style={styles.remove}>Close<Image style={styles.logo1} source={require('../assets/cancel.png')}/></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.table}>
                            <TouchableOpacity onPress={() => {setStatus('Preparing for Dispatch'),updateHandler();}}>
                                <Text style={{color:'#EFCC42'}}>Preparing for Dispatch</Text>
                            </TouchableOpacity>
                        </View>
                           
                        <View style={styles.table}>
                            <TouchableOpacity onPress={() => {setStatus('Dispatched'),updateHandler();}}>
                                <Text style={{color:'#2ED19B'}}>Dispatched</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.table}>
                            <TouchableOpacity onPress={() => {setStatus('Arrived'),updateHandler();}}>
                                <Text style={{color:'#CE4AEF'}}>Arrived</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.table}>
                            <TouchableOpacity onPress={() => {setStatus('Awaiting Processing'),updateHandler();}}>
                                <Text style={{color:'#D74D2B'}} >Awaiting Processing</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.table}>
                            <TouchableOpacity onPress={() => {setStatus('Processed'),updateHandler();}}>
                                <Text style={{color:'#1C59FF'}}>Processed</Text>
                            </TouchableOpacity>
                        </View>
                    </Popup>
                </View>
            </TouchableWithoutFeedback>
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
    button:{
        width:'20%',
        flex: 1,
        alignContent: 'flex-end',
        justifyContent: 'space-between',
    },
    logo:{
        width:20,
        height:20,
        alignItems:'center',
        justifyContent: 'center',
    },
    logo1:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent: 'center',
    },
    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
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
    /*colors
        Processed   ##1C59FF
        Awaiting Processed  #D74D2B 
        Arrived #CE4AEF
        dispatch  #2ED19B
        preparing for dispatch #EFCC42

    },
    
    */
    modal: {
        padding: 20
    },

    remove: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red',
        fontSize:20
    },

    update: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#32cd32'
    },

    table: {
        width:'100%',
        padding: 10,
        alignContent: 'space-between'
    },
    close:{
        width:50,
        height:50,
        alignItems:'center',
        justifyContent: 'center',
    },

    switch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default StatusScreen;