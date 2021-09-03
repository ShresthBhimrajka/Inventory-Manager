import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import Card from '../components/Card';

const Data = [
    {
        id: '1',
        data: 'Status 1'
    },
    {
        id: '2',
        data: 'Status 2'
    },
    {
        id: '3',
        data: 'Status 3'
    },
];

const StatusScreen = () => {

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
        alignItems: 'center'
    },

    item: {
        flex: 1,
        paddingVertical: 10,
        margin: '5%'
    }
});

export default StatusScreen;