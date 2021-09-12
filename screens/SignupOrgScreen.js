import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import { Colors } from '../assets/Colors';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

const SignupOrgScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const signupHandler = () => {
        if(!name){
            Alert.alert('Name required!');
        }
        else if(!address){
            Alert.alert('Email cannot be blank');
        }
        else{
            registration(email, password, name);
            setName('');
            setAddress('');
            navigation.push('Signup');
        }
    };

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <Text style={styles.text}>Create Organization Account</Text>
                    
                    <FormInput labelValue={name} onChangeText={(username) => {setName(username)}} placeholder='Organization Name' autoCapitalize='words' autoCorrect={false}/>

                    <FormInput labelValue={address} onChangeText={(orgAddress) => {setAddress(address)}} placeholder='Address' autoCapitalize='none' autoCorrect={false}/>

                    <FormButton buttonTitle='Register an Admin' onPress={signupHandler}/>

                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('Login')}>
                        <Text style={styles.navButtonText}>Already registered? Log in</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primaryBackgroud,
    },

    container: {
        backgroundColor: Colors.primaryBackgroud,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: '60%'
    },

    text: {
        fontSize: 20,
        marginBottom: 10,
        color: Colors.primaryText,
        fontWeight: 'bold'
    },

    navButton: {
        marginTop: 15
    },

    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.primaryText
    },

    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center'
    },

    colorTextPrivate: {
        fontSize: 14,
        fontWeight: '400',
        color: 'grey'
    }
});

export default SignupOrgScreen;