import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import firebase from 'firebase';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const RecordScreen = ({route}) => {
    const orgname = route.params.orgname;
    const [recData, setRecData] = useState([]);

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
                      return new Date(a['mil']).getTime() - new Date(b['mil']).getTime();
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
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>Employee: {item.emp}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardText}>In/Ex: {item.inex}</Text>
        </Card>
    );

    return (
        <View style={styles.screen}>
            <FlatList
                data={recData}
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
    }
});

export default RecordScreen;