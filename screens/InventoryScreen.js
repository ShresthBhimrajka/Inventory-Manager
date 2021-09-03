import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const Data = [
    {
        id: '1',
        data: 'Item 1'
    },
    {
        id: '2',
        data: 'Item 2'
    },
    {
        id: '3',
        data: 'Item 3'
    },
];

const InventoryScreen = () => {

    const renderItem = ({item}) => (
        <Card style={styles.item}>
            <Text>{item.data}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        margin: '5%'
    }
}); 

export default InventoryScreen;