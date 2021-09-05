import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../assets/Colors';

const FormButton = ({buttonTitle, ...children}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...children}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: 40,
        backgroundColor: Colors.loginButton,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },

    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default FormButton;