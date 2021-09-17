import firebase from "firebase";
import { Alert } from "react-native";

export async function removeItem(item, orgname, empName, empId) {
    try {
        const d = new Date();
        const yr = new String(d.getFullYear());
        const mon = new String(1 + d.getMonth());
        const date = new String(d.getDate());
        const hrs = new String(d.getHours());
        var min = new String(d.getMinutes());
        if(min=='0') {
            min = '00';
        }
        const mil = d.getTime().toString();
        const dt = date + '.' + mon + '.' + yr + ' - ' + hrs + ':' + min;
        const recId = mil+empId;
        firebase.firestore().collection('organizations').doc(orgname).collection('records').doc(recId).set({
            name: item.name,
            id: item.id,
            quantity: item.quantity,
            inex: 'ex',
            empid: empId,
            empname: empName,
            datetime: dt,
            mil: mil
        });
        const res = await firebase.firestore().collection('organizations').doc(orgname).collection('inventory').doc(item.id).delete();
      if( res ) {
        Alert.alert('Item successfully deleted');
      }
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}

export async function addItem(id, name, quantity, orgname) {
    try {
        const db = firebase.firestore().collection('organizations').doc(orgname).collection('inventory').doc(id);
        const doc = await db.get();
        var q = parseInt(quantity);
        if(doc.exists) {
            let data = doc.data();
            q = q + parseInt(data.quantity);
            db.set({
                name: name,
                id: id,
                quantity: q.toString()
            });
        }
        else {
            db.set({
                name: name,
                id: id,
                quantity: q.toString()
            });
        }
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}

export async function updateInv(item, quantity, orgname){
    try {
        const id = item.id;
        const name = item.name;
        firebase.firestore().collection('organizations').doc(orgname).collection('inventory').doc(id).set({
            id: id,
            name: name,
            quantity: quantity
        });
    } catch (err) {
        Alert.alert('There is something !!!', err.message);
    }
}

export async function updateRec(id, name, quantity, inex, empName, empId, orgname) {
    try {
        const d = new Date();
        const yr = new String(d.getFullYear());
        const mon = new String(1 + d.getMonth());
        const date = new String(d.getDate());
        const hrs = new String(d.getHours());
        const min = new String(d.getMinutes());
        if(min=='0') {
            min = '00';
        }
        const mil = d.getTime().toString();
        const dt = date + '.' + mon + '.' + yr + ' - ' + hrs + ':' + min;
        const recId = mil+empId;
        firebase.firestore().collection('organizations').doc(orgname).collection('records').doc(recId).set({
            name: name,
            id: id,
            quantity: quantity,
            inex: inex,
            empid: empId,
            empname: empName,
            datetime: dt,
            mil: mil
        });
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}