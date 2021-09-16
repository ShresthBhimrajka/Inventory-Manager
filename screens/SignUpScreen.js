import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import { registrationAdmin } from '../Authentication';
import { Colors } from '../assets/Colors';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

const SignUp = ({navigation}) => {
    const [orgName, setOrgName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signupHandler = () => {
        if(!orgName){
            Alert.alert('Organization Name Required');
        }
        else if(!name){
            Alert.alert('Name required!');
        }
        else if(!phone){
            Alert.alert('Enter a phone number');
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
            registrationAdmin(orgName, email, password, phone, name);
            setOrgName('');
            setName('');
            setPhone('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            Alert.alert('Sign up successful. Please login');
            navigation.replace('Login');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.container}>
                        <Text style={styles.text}>Create Admin Account</Text>

                        <FormInput labelValue={orgName} onChangeText={(orgName) => {setOrgName(orgName)}} placeholder='Organization Name' autoCorrect={false}/>
                        
                        <FormInput labelValue={name} onChangeText={(username) => {setName(username)}} placeholder='Admin Name' autoCapitalize='words' autoCorrect={false}/>

                        <FormInput labelValue={phone} onChangeText={(phone) => {setPhone(phone)}} placeholder='Admin Phone number' keyboardType='numeric' autoCorrect={false} maxLength={10}/>

                        <FormInput labelValue={email} onChangeText={(userEmail) => {setEmail(userEmail)}} placeholder='Admin Email' keyboardType='email-address' autoCapitalize='none' autoCorrect={false}/>

                        <FormInput labelValue={password} onChangeText={(userPassword) => {setPassword(userPassword)}} placeholder='Admin Password' secureTextEntry={true}/>

                        <FormInput labelValue={confirmPassword} onChangeText={(userPassword) => {setConfirmPassword(userPassword)}} placeholder='Confirm Password' secureTextEntry={true}/>

                        <FormButton buttonTitle='Sign Up' onPress={signupHandler}/>

                        <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('Login')}>
                            <Text style={styles.navButtonText}>Already registered? Log in</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        
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
        marginBottom: '40%'
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

export default SignUp;