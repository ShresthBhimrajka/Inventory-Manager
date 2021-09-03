import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const Scan = () => {
    return (
        <View style={styles.screen}>
            <Card>
                <Text>Scan</Text>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryBackgroud
    }
});

export default Scan;