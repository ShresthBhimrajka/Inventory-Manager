import firebase from "firebase";
import { Alert } from "react-native";

export async function removeItem(id, orgname) {
    try {
        const res = await firebase.firestore().collection('organizations').doc(orgname).collection('inventory').doc(id).delete();
      if( res ) {
        Alert.alert('Item successfully deleted');
      }
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}

export async function addItem(id, name, quantity, desc, orgname) {
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
                quantity: q.toString(),
                desc: desc
            });
        }
        else {
            db.set({
                name: name,
                id: id,
                quantity: q.toString(),
                desc: desc
            });
        }
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}

export async function updateInv(item, name, id, quantity, desc, empName, empId, orgname){
    try {
        var curid = item.id;
        var curname = item.name;
        var curquantity = item.quantity;
        var curdesc = item.desc
        if(id !== '' && id !== curid){
            const res = firebase.firestore().collection('organizations').doc(orgname).collection('inventory').doc(curid).delete();
            curid = id;
        }
        if(name !== ''){
            curname = name;
        }
        if(quantity !== ''){
            curquantity = quantity;
        }
        if(desc !== ''){
            curdesc = desc;
        }
        firebase.firestore().collection('organizations').doc(orgname).collection('inventory').doc(curid).set({
            id: curid,
            name: curname,
            quantity: curquantity,
            desc: desc
        });
        updateRec(curid, curname, curquantity, 'Updated', empName, empId, orgname);
        updateHistoy(curid, curname, curquantity, 'Updated', empId, orgname);
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
        var min = new String(d.getMinutes());
        if(min.length==1) {
            min = '0'+min;
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

export async function updateHistoy(id, name, quantity, inex, empId, orgname) {
    try {
        const d = new Date();
        const yr = new String(d.getFullYear());
        const mon = new String(1 + d.getMonth());
        const date = new String(d.getDate());
        const hrs = new String(d.getHours());
        var min = new String(d.getMinutes());
        if(min.length==1) {
            min = '0'+min;
        }
        const mil = d.getTime().toString();
        const dt = date + '.' + mon + '.' + yr + ' - ' + hrs + ':' + min;
        const hisId = mil+empId;
        firebase.firestore().collection('organizations').doc(orgname).collection('history').doc(empId).collection('records').doc(mil).set({
            name: name,
            id: id,
            quantity: quantity,
            inex: inex,
            datetime: dt,
            mil: mil
        });
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}

export async function addShipment(id, name, quantity, desc, inex, empname, empid, orgname) {
    try {
        const d = new Date();
        const yr = new String(d.getFullYear());
        const mon = new String(1 + d.getMonth());
        const date = new String(d.getDate());
        const hrs = new String(d.getHours());
        var min = new String(d.getMinutes());
        if(min.length==1) {
            min = '0'+min;
        }
        const mil = d.getTime().toString();
        const dt = date + '.' + mon + '.' + yr + ' - ' + hrs + ':' + min;
        const shipId = mil+id;
        firebase.firestore().collection('organizations').doc(orgname).collection('shipment').doc(shipId).set({
            id: id,
            name: name,
            quantity: quantity,
            desc: desc,
            status: 'Preparing for Dispatch',
            empid: empid,
            empname: empname,
            mil: mil,
            datetime: dt
        });
        updateRec(id, name, quantity, 'Added Shipment', empname, empid, orgname);
        updateHistoy(id, name, quantity, 'Added Shipment', empid, orgname);
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}

export async function updateStatus(item, status, orgname, empname, empid) {
    try {
        const shipid = item.mil + item.id;
        await firebase.firestore().collection('organizations').doc(orgname).collection('shipment').doc(shipid).update({
            status: status
        });
        updateRec(item.id, item.name, item.quantity, 'Updated Shipment Status', empname, empid, orgname);
        updateHistoy(item.id, item.name, item.quantity, 'Updated Shipment Status', empid, orgname);
    } catch (err) {
        Alert.alert('There is something wrong !!!', err.message);
    }
}