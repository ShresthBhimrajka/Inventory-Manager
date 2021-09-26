import React, {useState} from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'

const SearchBar = ({placeholdertext, onValueSubmitted, onChangeValue, data}) => {
    return(
        <View style={styles.viewstyle}>
            <Feather name='search' style={styles.iconStyle}/>
            <TextInput style={styles.textInputStyle} placeholder={placeholdertext} placeholderTextColor="#e6e6e6" onChangeText={(newChange) => onChangeValue(newChange)} onSubmitEditing={(subValue) => onValueSubmitted(subValue)}/>
        </View>
    );
};

const styles=StyleSheet.create({
    viewstyle: {
        backgroundColor: 'skyblue',
        flexDirection: 'row',
        marginTop: 10,
        height: 40,
        borderRadius: 10,
        width: "80%"
    },

    textInputStyle: {
        flex: 1,
        fontSize: 18
    },

    iconStyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 15
    }
});

export default SearchBar;