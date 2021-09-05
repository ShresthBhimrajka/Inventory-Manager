import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { Colors } from '../assets/Colors';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <Text style={styles.text}>Inventory Manager</Text>

                    <FormInput labelValue={email} onChangeText={(userEmail) => {setEmail(userEmail)}} placeholder='Email' keyboardType='email-address' autoCapitalize='none' autoCorrect={false}/>

                    <FormInput labelValue={password} onChangeText={(userPassword) => {setPassword(userPassword)}} placeholder='Password' secureTextEntry={true}/>

                    <FormButton buttonTitle='Sign In' onPress={() => {}}/>
                    
                    <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                        <Text style={styles.navButtonText}>Forgot Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.push('Signup')}>
                        <Text style={styles.navButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primaryBackgroud
    },

    container: {
        backgroundColor: Colors.primaryBackgroud,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    text: {
        fontSize: 20,
        marginBottom: 10,
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
        textAlign: 'right',
        color: Colors.primaryText
    }
});

export default LoginScreen;