import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert} from "react-native";

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { resetPassword } from "../Autherntication";
import { Colors } from "../assets/Colors";

const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    const mailHandler = () => {
        if(!email){
            Alert.alert('Enter a valid email');
        }
        else{
            resetPassword(email);
            setEmail('');
            navigation.push('Login');
        }
    };

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.text} adjustsFontSizeToFit numberOfLines={2} >Enter your registered mail id to recieve password reset link</Text>
                    <FormInput labelValue={email} onChangeText={(userEmail) => {setEmail(userEmail)}} placeholder='Email' keyboardType='email-address' autoCapitalize='none' autoCorrect={false}/>
                    <FormButton buttonTitle='Send link' onPress={mailHandler}/>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.push('Login')}>
                        <Text style={styles.navButtonText}>Back to login</Text>
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
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryBackgroud,
        padding: 30,
        marginTop: '50%',
        marginBottom: '60%'
    },

    text: {
        color: Colors.primaryText,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    backButton: {
        marginVertical: 20
    },

    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.primaryText
    }
});

export default ResetPasswordScreen;