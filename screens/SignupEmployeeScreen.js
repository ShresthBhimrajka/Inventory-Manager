import React, {useState} from 'react';
import {ImageBackground,ScrollView, Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import { registrationEmployee } from '../Authentication';
import { Colors } from '../assets/Colors';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

const SignUpEmployee = ({navigation}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [orgcode, setOrgCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signupHandler = () => {
        if(!name){
            Alert.alert('Name required!');
        }
        else if(!phone){
            Alert.alert('Enter a phone number');
        }
        else if(!orgcode){
            Alert.alert('Enter a valid code');
        }
        else if(!email){
            Alert.alert('Email cannot be blank');
        }
        else if(!password){
            Alert.alert('Enter a valid password!');
        }
        else if(!confirmPassword){
            Alert.alert('Enter a valid password');
        }
        else if(password !== confirmPassword){
            Alert.alert('Password does not match');
        }
        else{
            registrationEmployee(email, password, name, phone, orgcode);
            setName('');
            setPhone('');
            setOrgCode('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            Alert.alert('Sign up successful. Please login');
            navigation.replace('Login');
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground style={styles.background} source={require('../assets/employee.png')}>  
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.container}>
                        <Text style={styles.text}>Create Employee Account</Text>
                        
                        <FormInput labelValue={name} onChangeText={(username) => {setName(username)}} placeholder='Name' autoCapitalize='words' autoCorrect={false}/>

                        <FormInput labelValue={phone} onChangeText={(phone) => {setPhone(phone)}} placeholder='Phone Number' keyboardType='numeric' autoCorrect={false} maxLength={10}/>

                        <FormInput labelValue={orgcode} onChangeText={(orgcode) => {setOrgCode(orgcode)}} placeholder='Organization Code' autoCapitalize='none' autoCorrect={false}/>

                        <FormInput labelValue={email} onChangeText={(userEmail) => {setEmail(userEmail)}} placeholder='Email' keyboardType='email-address' autoCapitalize='none' autoCorrect={false}/>

                        <FormInput labelValue={password} onChangeText={(userPassword) => {setPassword(userPassword)}} placeholder='Password' secureTextEntry={true}/>

                        <FormInput labelValue={confirmPassword} onChangeText={(userPassword) => {setConfirmPassword(userPassword)}} placeholder='Confirm Password' secureTextEntry={true}/>

                        <FormButton buttonTitle='Sign Up' onPress={signupHandler}/>

                        <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('Login')}>
                            <Text style={styles.navButtonText}>Already registered? Log in</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
        paddingTop: 40
    },
    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //padding: 20,
        marginTop: '20%',
        marginBottom: '50%'
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

export default SignUpEmployee;