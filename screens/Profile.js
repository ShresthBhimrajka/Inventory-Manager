import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import firebase from 'firebase';
import { loggingOut } from '../Autherntication';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const Profile = ({navigation}) => {
    const signoutHandler = () => {
        loggingOut();
        navigation.push('Login');
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <Text>Profile</Text>
            </Card>
            <View style={{marginBottom: 20}}>
                <Button title='Sign Out' onPress={signoutHandler} color='red'/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryBackgroud,
    },

    card: {
        marginVertical: 20
    }
});

export default Profile;