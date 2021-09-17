import React, {useState} from 'react';
import {Image, ImageBackground,ScrollView, View, Text,TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert } from 'react-native';

import { signIn } from '../Authentication';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { Colors } from '../assets/Colors';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginHandler = () => {
        if(!email){
            Alert.alert('Enter a valid email');
        }
        else if(!password){
            Alert.alert('Enter a valid password');
        }
        else{
            signIn(email, password);
            setEmail('');
            
            setPassword('');
            navigation.push('Loading');
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground style={styles.background} source={require('../assets/login.png')}> 
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../assets/Vennto.png')}/>
                    <Text style={styles.text}>Vennto</Text>

                    <FormInput labelValue={email} onChangeText={(userEmail) => {setEmail(userEmail)}} placeholder='Email' keyboardType='email-address' autoCapitalize='none' autoCorrect={false}/>

                    <FormInput labelValue={password} onChangeText={(userPassword) => {setPassword(userPassword)}} placeholder='Password' secureTextEntry={true}/>

                    <FormButton buttonTitle='Sign In' onPress={loginHandler}/>
                    
                    <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.push('ForgotPassword')}>
                        <Text style={styles.navButtonText}>Forgot Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.push('SignupEmployee')}>
                        <Text style={styles.navButtonText}>Create Account as an Employee</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.push('SignupAdmin')}>
                        <Text style={styles.navButtonText}>Sign Up as an Organization and create Admin Account</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
        </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
    },
    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    logo:{
        width:40,
        height:60,
        alignItems:'center',
        justifyContent: 'center',
    },
    container: {
        
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        marginTop: '30%',
        marginBottom: '39%',
        
    },

    text: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold',
        color: Colors.primaryText
    },

    navButton: {
        marginTop: 15
    },

    forgotButton: {
        marginVertical: 20
    },

    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.primaryText
    }
});

export default LoginScreen;