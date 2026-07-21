const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDLom0OpM755uoxo7raXlIOPl8rowKqMm0",
  authDomain: "rrdchcom.firebaseapp.com",
  projectId: "rrdchcom",
  storageBucket: "rrdchcom.firebasestorage.app",
  messagingSenderId: "878744432264",
  appId: "1:878744432264:web:c33fb2527a342262dc393d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function test() {
  try {
    const email = 'test' + Date.now() + '@example.com';
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, 'password123');
    console.log("Registered as", cred.user.uid);
    const patientId = 'PAT' + String(Date.now()).slice(-6);
    await db.collection('patients').doc(cred.user.uid).set({
      patientId: patientId, 
      firstName: 'Test', 
      lastName: 'User',
      mobile: '1234567890', 
      email: email, 
      dob: '2000-01-01', 
      gender: 'Male',
      registeredOn: new Date().toLocaleDateString('en-IN'),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("Profile created");
    const docRef = db.collection('appointments').doc('TEST' + Date.now());
    await docRef.set({
      id: 'TEST' + Date.now(),
      patientId: patientId,
      uid: cred.user.uid,
      test: true
    });
    console.log("SUCCESS writing appointment!");
    await docRef.delete();
  } catch (e) {
    console.error("ERROR:", e.message);
  }
  process.exit(0);
}

test();
