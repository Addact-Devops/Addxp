import { initializeApp } from "firebase/app";
// import admin from 'firebase-admin'

import { getFirestore, collection } from "firebase/firestore";

const firebase = async () => {
   /* ===================== AddXp Config ===================== */
   const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
   };

   const app = initializeApp(firebaseConfig);
   const firestore = getFirestore();
   // const db = collection( firestore,dbName);
   // const db = firestore.collection('')
   return firestore;
};

export default firebase;
