import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert, Button} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Colors } from '../assets/Colors';
import Popup from '../components/Popup';

const PhoneSignUp = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [otp, setotp] = useState('');
    const [visible, setVisible] = useState(false);

    const signupHandler = () => {
        if(!otp){
            Alert.alert('OTP is wrong');
        }
        else{
            setPhone('');
            navigation.replace('Login');
        }
    };

    const checkNo = () => {
        if(!phone) {
            Alert.alert('Enter a valid number');
        }
        else {
            setVisible(true);
        }
    };

    const cancel = () => {
        setPhone('');
        setotp('');
        setVisible(false);
    };

    const takeOTP = () => (
        <Popup visible={visible}>
             <Text>Enter the OTP sent {phone}</Text>
             <FormInput labelValue={otp} onChangeText={(otp) => setotp(otp)} placeholder='OTP' keyboardType='numeric' autocorrect='none'/>
             <FormButton buttonTitle='Submit' onPress={signupHandler}/>
             <Button title='Cancel' color='red' onPress={cancel}/>
        </Popup>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.screen}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            <Text styles={styles.text}>Your phone number will be used for registering and signing into the app</Text>
                            <FormInput labelValue={phone} onChangeText={(phone) => setPhone(phone)} placeholder='Enter your phone no.' keyboardType='numeric' maxLength={10} autocorrect='none'/>
                            <FormButton buttonTitle='Submit' onPress={checkNo}/>
                            <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('Login')}>
                                <Text style={styles.navButtonText}>Already registered? Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
            {visible==true ? takeOTP() : <View></View>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
        marginBottom: '50%'
    },

    navButton: {
        marginTop: 15
    },

    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.primaryText
    },

    text: {
        fontSize: 20,
        marginBottom: 10,
        color: Colors.primaryText,
        fontWeight: 'bold'
    }
});

export default PhoneSignUp;