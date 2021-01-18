import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Replace this with your own config details
const config = {
    apiKey: "AIzaSyD9QebcxBGQjClYjDIihrnQlI306Nz2Rtg",
    authDomain: "meetbl-test.firebaseapp.com",
    databaseURL: "https://meetbl-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "meetbl-test",
    storageBucket: "meetbl-test.appspot.com",
    messagingSenderId: "740990168266",
    appId: "1:740990168266:web:ba8a30dd7bb996aa415833"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;