import firebase from 'firebase';
import 'firebase/firestore';
import {Alert} from 'react-native';

export async function registrationAdmin(orgname, email, password, phone, name) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    orgname = orgname.trim().toLowerCase();
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
      id: currentUser.uid
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

    orgcode = orgcode.trim().toLowerCase();
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