import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const FormInput = ({labelValue, text, ...children}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput value={labelValue} numberOfLines={1} placeholder={text} placeholderTextColor='#666' textAlign='center' {...children} style={styles.input}/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        backgroundColor: '#fff'
    },

    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: "66%",
        height: 20,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 8
    }    
});

export default FormInput;