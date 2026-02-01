const firebaseConfig = {
  apiKey: "AIzaSyD71mpolAsmejtU2icecQQcX07iCW_is0Y",
  authDomain: "ravicardmaker.firebaseapp.com",
  projectId: "ravicardmaker",
  storageBucket: "ravicardmaker.firebasestorage.app",
  messagingSenderId: "125321734592",
  appId: "1:125321734592:web:fc0cfe4d8e85ee80134025",
  measurementId: "G-EVDWN80G38"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
