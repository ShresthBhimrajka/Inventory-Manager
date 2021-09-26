import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, Button, Alert, TouchableOpacity, Keyboard, ImageBackground, ScrollView } from 'react-native';
import firebase from 'firebase';
import { loggingOut, changeEmail, changePhone, changePassword, deleteAccount } from '../Authentication';

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
    const [visibleDelete, setVisibleDelete] = useState(false);

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

    const deleteHandler = () => {
        deleteAccount(orgname);
        navigation.push('Login');
    };

    return (
        <ImageBackground style={styles.background} source={require('../assets/profile.png')}>
            <ScrollView>
                <View style={styles.screen}>
                    <Popup visible={visibleDelete}>
                        <Text style={{textAlign:'center'}}>Are you Sure?</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => setVisibleDelete(false)}>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cancel}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={deleteHandler}>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.confirm}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </Popup>

                    <Popup visible={visible}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Enter your details</Text>
                        <FormInput labelValue={newEmail} onChangeText={(newEmail) => setNewEmail(newEmail)} placeholder='Email' autocapitalize='false' autocorrect='none' keyboardType='email-address'/>
                        <FormInput labelValue={newPhone} onChangeText={(newPhone) => setNewPhone(newPhone)} placeholder='Phone' keyboardType='numeric' maxLength={10} autocorrect='none'/>
                        <FormInput labelValue={pass} onChangeText={(pass) => setNewPass(pass)} placeholder='Password' autocapitalize='false' autocorrect='none'/>
                        <FormInput labelValue={conPass} onChangeText={(conPass) => setConPass(conPass)} placeholder='Confirm Password' autocapitalize='false' autocorrect='none'/>
                        <FormButton buttonTitle='Update' onPress={updateHandler}/>
                        <TouchableOpacity onPress={() => setVisibleDelete(true)}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.delete}>Delete your Account</Text>
                        </TouchableOpacity>
                        <View style={styles.modal}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Text style={styles.delete}>Cancel<Image style={styles.logo} source={require('../assets/cancel.png')}/></Text>
                        </TouchableOpacity>
                           
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
                            <Text style={styles.update}>Update Details <Image style={styles.logo} source={require('../assets/edit.png')}/>
                            </Text>
                        </TouchableOpacity>
                    </Card>

                    {(access=='admin' ? viewopts: <View></View>)}

                    <View style={{marginBottom: 20}}>
                        <TouchableOpacity onPress={signoutHandler}>
                           <Image style={styles.logo1} source={require('../assets/signout.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    logo1:{
        width:50,
        height:50,
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
        textAlign: "center",
        fontWeight:"bold"        
    },
  
    heading: {
        textAlign: 'center',
        fontWeight: 'bold'
    },

    buttonContainer: {
        height: 50,
        width: 300,
        maxWidth: '70%',
        backgroundColor: "#cee1f5",
        marginBottom: '30%'
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
    },

    cancel: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },

    confirm: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#32cd32'
    },

    delete: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fc3d3d',
        padding: 10,
        fontSize: 15
    },
    
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    }
});

export default Profile;