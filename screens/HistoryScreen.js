import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import firebase from 'firebase';
import SearchBar from './SearchBar';



const HistoryScreen=()=>{
    const [data, setData] = useState([]);

    return(
        <View>
            <SearchBar
            data={data}
            onChangeValue={(newValue)=>setData(newValue)}
            onValueSubmitted={()=> alert(data)}/>
        </View>
    )
};

export default HistoryScreen;