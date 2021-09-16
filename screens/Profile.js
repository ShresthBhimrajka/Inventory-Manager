import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { loggingOut } from '../Authentication';

import ViewUsers from './ViewUsers';
import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const Profile = ({navigation}) => {
    let userId = firebase.auth().currentUser.uid;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [access, setAccess] = useState('');
    const [orgname, setOrgName] = useState('');
    const [orgcode, setOrgCode] = useState('');

    useEffect(() => {
        async function getUserInfo() {  
            let docuser = await firebase.firestore().collection('allusers').doc(userId).get();    
            if(docuser.exists){
                let dataObj = docuser.data();
                setName(dataObj.name);
                setOrgName(dataObj.orgname);
                doc = await firebase.firestore().collection('organizations').doc(orgname).collection('users').doc(userId).get();
                if(doc.exists) { 
                    let data = doc.data();
                    setPhone(data.phone);
                    setEmail(data.email);
                    setAccess(dataObj.access);
                    setOrgCode(dataObj.orgcode);
                }
            }
            else{
                Alert.alert('Info not available');
            }
        }
        getUserInfo();
    })

    const signoutHandler = () => {
        loggingOut();
        navigation.push('Login');
    };

    const viewopts = (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push('Users', {orgname: orgname})}>
            <Card style={styles.buttonContainer}>
                <Text style={styles.buttonText}>View Users</Text>
            </Card>
        </TouchableOpacity> 
    );

    const code = (
        <Text style={styles.heading}>Organization Code: {orgcode}</Text>
    );

    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <Text style={styles.heading}>User Details</Text>
                {access=='admin' ? code : <View></View>}
                <Text></Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Name:     {name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Organization:     {orgname}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Phone:    {phone}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Email:    {email}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Access:   {(access=='emp' ? 'employee' : 'admin')}</Text>
            </Card>

            {(access=='admin' ? viewopts: <View></View>)}

            <View style={{marginBottom: 20}}>
                <Button title='Sign Out' onPress={signoutHandler} color='red'/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryBackgroud,
    },

    card: {
        marginVertical: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 300,
        width: '70%'
    },

    text: { 
        textAlign: 'left',
    },

    heading: {
        textAlign: 'center',
        fontWeight: 'bold'
    },

    buttonContainer: {
        height: 100,
        width: 300,
        maxWidth: '70%',
        backgroundColor: Colors.homeTouchable,
        marginBottom: '60%'
    },
    
    buttonText: {
        fontSize: 22,
        color: 'black'
    }
});

export default Profile;