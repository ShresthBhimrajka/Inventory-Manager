import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import firebase from 'firebase';
import { loggingOut } from '../Autherntication';

import { Colors } from '../assets/Colors';
import Card from '../components/Card';

const Profile = ({navigation}) => {
    let userId = firebase.auth().currentUser.uid;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [access, setAccess] = useState('');
    const [orgname, setOrgName] = useState('');

    useEffect(() => {
        async function getUserInfo() {
            let docuser = await firebase.firestore().collection('allusers').doc(userId).get();
  
            if (!docuser.exists){
                Alert.alert('No user data found!');
            }
            else{
                let dataObj = docuser.data();
                setName(dataObj.name);
                setOrgName(dataObj.orgname);
                let doc = await firebase.firestore().collection('organizations').doc(orgname).collection('users').doc(userId).get();
                if(doc.exists) { 
                    data = doc.data();
                    setPhone(data.phone);
                    setEmail(data.email);
                    setAccess(dataObj.access);
                }
            }
        }
        getUserInfo();
    })

    const signoutHandler = () => {
        loggingOut();
        navigation.push('Login');
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <Text style={styles.text}>Name:     {name}</Text>
                <Text style={styles.text}>Organization:     {orgname}</Text>
                <Text style={styles.text}>Phone:    {phone}</Text>
                <Text style={styles.text}>Email:    {email}</Text>
                <Text style={styles.text}>Access:   {(access=='emp' ? 'employee' : 'admin')}</Text>
            </Card>
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
    }
});

export default Profile;