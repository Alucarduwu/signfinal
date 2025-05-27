// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

console.log("📦 Iniciando configuración de Firebase...");

const firebaseConfig = {
  apiKey: "AIzaSyDCwimcnbbSAoQ9CEg4JxMdnPFx4H2ixA0",
  authDomain: "signspeak-3f22a.firebaseapp.com",
  projectId: "signspeak-3f22a",
  storageBucket: "signspeak-3f22a.appspot.com",
  messagingSenderId: "80973538850",
  appId: "1:80973538850:android:535d8497287fd7d1818c7b",
};

let app, firestore, storage;

try {
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase app inicializada correctamente");
} catch (error) {
  console.error("❌ Error al inicializar Firebase app:", error);
}

try {
  firestore = getFirestore(app);
  console.log("✅ Firebase Firestore inicializado correctamente");
} catch (error) {
  console.error("❌ Error al inicializar Firebase Firestore:", error);
}

try {
  storage = getStorage(app);
  console.log("✅ Firebase Storage inicializado correctamente");
} catch (error) {
  console.error("❌ Error al inicializar Firebase Storage:", error);
}

console.log("✅ Firebase configurado correctamente");

export { firestore, storage };
