import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyAi3eblzWBj_tpXMMAVZfJxPTG2Ha-QqeE",
    authDomain: "reunited-ua.firebaseapp.com",
    projectId: "reunited-ua",
    storageBucket: "reunited-ua.appspot.com",
    messagingSenderId: "707618547460",
    appId: "1:707618547460:web:88c363e06933cfb9091251",
    measurementId: "G-MVRF3R1VSY"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;