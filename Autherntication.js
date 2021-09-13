import firebase from 'firebase';
import 'firebase/firestore';
import {Alert} from 'react-native';
import { useState } from 'react';

export async function registrationAdmin(orgname, email, password, phone, name) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    orgname = orgname.trim();
    const orgcode = new String(orgname.substring(0,3) + orgname.substring(orgname.length-3));

    const db = firebase.firestore();

    db.collection('allusers').doc(currentUser.uid).set({
        orgname: orgname,
        access: 'admin',
        name: name,
      });

    db.collection('organizations').doc(orgname).collection('users').doc(currentUser.uid).set({
      name: name,
      email: email,
      access: 'admin',
      phone: phone,
      id: currentUser.uid,
      orgcode: orgcode
    });

    db.collection('allorgs').doc(orgcode).set({
      name: orgname
    });

  } catch (err) {
    Alert.alert('There is something wrong!!!!', err.message);
  }
}

export async function registrationEmployee(email, password, name, phone, orgcode) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    orgcode = orgcode.trim();
    orgcode = new String(orgcode);

    const db = firebase.firestore();
    let docorg = await db.collection('allorgs').doc(orgcode).get();

    if(!docorg.exists){
      Alert.alert('Organization Code invalid !');
    }
    else{
      let dataObj = docorg.data();
      const orgname = dataObj.name;

      db.collection('allusers').doc(currentUser.uid).set({
        orgname: orgname,
        access: 'emp',
        name: name,
      });
      
      db.collection('organizations').doc(orgname).collection('users').doc(currentUser.uid).set({
        name: name,
        email: email,
        access: 'emp',
        phone: phone,
        id: currentUser.uid
      });
    }

  } catch (err) {
    Alert.alert('There is something wrong!!!!', err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function resetPassword(email) {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    Alert.alert('Password rest link sent to your registered email address');
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function removeUser(item, orgname) {
  try {
    const res1 = await firebase.firestore().collection('allusers').doc(item.id).delete();
    const res2 = await firebase.firestore().collection('organizations').doc(orgname).collection('users').doc(item.id).delete();
    if( res1 && res2 ){
        Alert.alert('Employee successfully removed');
    }
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function removeItem(item, orgname) {
  try {
    const res = await firebase.firestore().collection('organizations').doc(orgname).collection('inventory').doc(item.id).delete();
    if( res ) {
      Alert.alert('Item successfully deleted');
    }
  } catch (err) {
      Alert.alert('There is something wrong !!!', err.message);
  }
}

export async function promote(item, orgname) {
  try {
    const name = item.name;
    const id = item.id;
    const email = item.email;
    const access = 'admin';
    const phone = item.phone;
    orgname = orgname;
    const orgcode = orgname.substring(0,3) + orgname.substring(orgname.length-3);
    const db1 = firebase.firestore().collection('allusers').doc(id);
    db1.set({
      access: access,
      name: name,
      orgname: orgname,
      orgcode: orgcode
    });
    const db2 = firebase.firestore().collection('organizations').doc(orgname).collection('users').doc(id);
    db2.set({
      name: name,
      email: email,
      id: id,
      access: access,
      phone: phone
    });
  } catch (err) {
      Alert.alert('There is something wrong !!!', err.message);
  }
}