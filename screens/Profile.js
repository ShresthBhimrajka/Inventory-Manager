import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, Button, Alert, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { loggingOut, changeEmail, changePhone, changePassword } from '../Authentication';

import Popup from '../components/Popup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Card from '../components/Card';

const Profile = ({navigation}) => {
    let userId = firebase.auth().currentUser.uid;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [access, setAccess] = useState('');
    const [orgname, setOrgName] = useState('');
    const [orgcode, setOrgCode] = useState('');
    const [visible, setVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [pass, setNewPass] = useState('');
    const [conPass, setConPass] = useState('');

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
            <Text style={styles.buttonText}><Image style={styles.user} source={require("../assets/users.png")}/> View Users</Text>
            </Card>
        </TouchableOpacity> 
    );

    const code = (
        <Text style={styles.heading}>Organization Code: {orgcode}</Text>
    );

    const updateHandler = () => {
        if(newEmail !== '') {
            changeEmail(userId, newEmail, orgname);
        }
        if(newPhone !== '') {
            changePhone(userId, newPhone, orgname);
        }
        if(pass !== '' && conPass !== '' && pass == conPass) {
            changePassword(pass);
        }
        Keyboard.dismiss;
        setNewEmail('');
        setNewPhone('');
        setVisible(false);
    };

    return (
        <ImageBackground style={styles.background} source={require('../assets/profile.png')}>
        <View style={styles.screen}>
            <Popup visible={visible}>
                <Text style={{fontWeight: 'bold'}}>Enter your details</Text>
                <FormInput labelValue={newEmail} onChangeText={(newEmail) => setNewEmail(newEmail)} placeholder='Email' autocapitalize='false' autocorrect='none' keyboardType='email-address'/>
                <FormInput labelValue={newPhone} onChangeText={(newPhone) => setNewPhone(newPhone)} placeholder='Phone' keyboardType='numeric' maxLength={10} autocorrect='none'/>
                <FormInput labelValue={pass} onChangeText={(pass) => setNewPass(pass)} placeholder='Password' autocapitalize='false' autocorrect='none'/>
                <FormInput labelValue={conPass} onChangeText={(conPass) => setConPass(conPass)} placeholder='Confirm Password' autocapitalize='false' autocorrect='none'/>
                <FormButton buttonTitle='Update' onPress={updateHandler}/>
                <View style={styles.modal}>
                    <Button title='Cancel' color='red' onPress={() => setVisible(false)}/>
                </View>
            </Popup>
            <Card style={styles.card}>
            <Image style={styles.profile} source={require("../assets/bigprofileicon.png")}/>
                <Text style={styles.heading1}>User Details</Text>
                {access=='admin' ? code : <View></View>}
                <Text></Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Name:     {name}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Organization:     {orgname}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Phone:    {phone}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Email:    {email}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Access:   {(access=='emp' ? 'employee' : 'admin')}</Text>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Text style={styles.update}>Update Details<Image style={styles.logo} source={require('../assets/edit.png')}/>
                    </Text>
                </TouchableOpacity>
            </Card>

            {(access=='admin' ? viewopts: <View></View>)}

            <View style={{marginBottom: 20}}>
                <Button title='Sign Out' onPress={signoutHandler} color='red'/>
            </View>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
  
    profile:{
        alignSelf:"center",
        justifyContent:"center",
        height: 100,
        width:100,
    },
  
    logo:{
        width:20,
        height:20,
        alignItems:'center',
        justifyContent: 'center',
    },
    background:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
  
    card: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems:"center",
        width: '90%',
        
    },

    text: { 
        textAlign: 'left',
    },
  
    heading1: {
        fontSize: 22,
        alignItems: "center",
        fontWeight:"bold"        
    },
  
    heading: {
        textAlign: 'center',
        fontWeight: 'bold'
    },

    buttonContainer: {
        height: 100,
        width: 300,
        maxWidth: '70%',
        backgroundColor: "#a9ceff",
        marginBottom: '60%'
    },
    
    buttonText: {
        fontSize: 15,
        color: 'black'
    },

    modal: {
        padding: 20
    },
    user:{
        height:15,
        width:20,
    },

    update: {
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default Profile;