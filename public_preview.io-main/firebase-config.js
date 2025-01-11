// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-6sYZQI_Lx4dvF0_rwc_8eITtBkx8_Fc",
    authDomain: "wschwl.firebaseapp.com",
    databaseURL: "https://wschwl-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "wschwl",
    storageBucket: "wschwl.appspot.com",
    messagingSenderId: "385038456722",
    appId: "1:385038456722:web:ac061e274cd336fe27934b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();
