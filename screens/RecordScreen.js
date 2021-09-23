import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import firebase from 'firebase';
<<<<<<< Updated upstream

import { Colors } from '../assets/Colors';
=======
import SearchBar from './SearchBar';
>>>>>>> Stashed changes
import Card from '../components/Card';

const RecordScreen = ({route}) => {
    const orgname = route.params.orgname;
    const [recData, setRecData] = useState([]);
<<<<<<< Updated upstream
=======
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);
>>>>>>> Stashed changes

    useEffect(() => {
          try {  
              const rec = firebase.firestore().collection('organizations').doc(orgname).collection('records').onSnapshot(querySnapshot => {
                  const data = [];
                  querySnapshot.forEach(documentSnapshot => {
                      data.push({
                          ...documentSnapshot.data(),
                          key: documentSnapshot.id
                      });
                  });
                  setRecData(data.sort(function(a,b) {
                      return parseInt(b['mil']) - parseInt(a['mil']);
                  }));
              });
              return () => rec;
          } 
          catch (err) {
              Alert.alert('Records Error !');
          }
    }, [])

    const renderItem = ({item}) => (
        <Card style={styles.item}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>ID:   {item.id}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Name: {item.name}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Quantity: {item.quantity}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Date: {item.datetime}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Employee Name: {item.empname}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Employee Id: {item.empid}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>In/Ex: {item.inex}</Text>
        </Card>
    );

    return (
        <ImageBackground style={styles.background} source={require('../assets/records.png')}>
<<<<<<< Updated upstream
        <View style={styles.screen}>
            <FlatList
                data={recData}
                renderItem={renderItem}/>
        </View>
=======
            
            <View style={styles.screen}>
            <SearchBar
            data={data}
            onChangeValue={(newValue)=>setData(newValue)}
            onValueSubmitted={()=> alert(data)}/>
                <FlatList
                    keyExtractor={item => item.mil}
                    data={recData}
                    renderItem={renderItem}/>
                {visible ? showDetails() : <View></View>}
            </View>
>>>>>>> Stashed changes
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

export default RecordScreen;