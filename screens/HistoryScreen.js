import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity, Button} from 'react-native';
import firebase from 'firebase';

import Popup from '../components/Popup';
import Card from '../components/Card';

const HistoryScreen = ({route}) => {
    const orgname = route.params.orgname;
    const userId = firebase.auth().currentUser.uid;
    const [hisData, setHisData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        try {  
            const  his = firebase.firestore().collection('organizations').doc(orgname).collection('history').doc(userId).collection('records').onSnapshot(querySnapshot => {
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
        <View style={styles.screen}>
            <FlatList
                keyExtractor={item => item.mil}
                data={hisData}
                renderItem={renderItem}/>
            {visible ? showDetails() : <View></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

    modal: {
        padding: 10
    }
});

export default HistoryScreen;