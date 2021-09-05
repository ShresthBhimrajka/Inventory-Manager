import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Colors } from '../assets/Colors';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                    <Text style={styles.text}>Create Account</Text>

                    <FormInput labelValue={email} onChangeText={(userEmail) => {setEmail(userEmail)}} placeholder='Email' keyboardType='email-address' autoCapitalize='none' autoCorrect={false}/>

                    <FormInput labelValue={password} onChangeText={(userPassword) => {setPassword(userPassword)}} placeholder='Password' secureTextEntry={true}/>

                    <FormInput labelValue={confirmPassword} onChangeText={(userPassword) => {setConfirmPassword(userPassword)}} placeholder='Confirm Password' secureTextEntry={true}/>

                    <FormButton buttonTitle='Sign Up' onPress={() => {}}/>

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
    },

    text: {
        fontSize: 20,
        marginBottom: 10,
        color: Colors.primaryText
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