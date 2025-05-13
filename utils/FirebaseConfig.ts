// Importa las funciones necesarias de los SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMLfAU9ORKvmJw7E-waTNIONLF768kUqo",
    authDomain: "fedeganapp-v2.firebaseapp.com",
    projectId: "fedeganapp-v2",
    storageBucket: "fedeganapp-v2.appspot.com", // corregido: era .firebasestorage.app (incorrecto)
    messagingSenderId: "774933279793",
    appId: "1:774933279793:web:a08cb07de2a9b7d05c9110"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
