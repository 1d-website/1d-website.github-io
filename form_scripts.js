const firebaseConfig = {
    apiKey: "AIzaSyC-6sYZQI_Lx4dvF0_rwc_8eITtBkx8_Fc",
    authDomain: "wschwl.firebaseapp.com",
    databaseURL: "https://wschwl-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wschwl",
    storageBucket: "wschwl.firebasestorage.app",
    messagingSenderId: "385038456722",
    appId: "1:385038456722:web:ac061e274cd336fe27934b"
};
firebase.initializeApp(firebaseConfig);

function fetchForms() {
    const dbRef = firebase.database().ref('/form');
    dbRef.once('value', (snapshot) => {
        const data = snapshot.val();
        const formsDiv = document.getElementById('forms');
        formsDiv.innerHTML = '';
        for (const formName in data) {
            const formLink = data[formName].form_link;
            const formButton = document.createElement('button');
            formButton.innerText = formName;
            formButton.onclick = () => location.href = formLink;
            formsDiv.appendChild(formButton);
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchForms);
