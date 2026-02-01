const firebaseConfig = {
apiKey:"YOUR_KEY",
authDomain:"YOUR_DOMAIN",
projectId:"YOUR_ID",
storageBucket:"YOUR_BUCKET",
messagingSenderId:"YOUR_ID",
appId:"YOUR_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
