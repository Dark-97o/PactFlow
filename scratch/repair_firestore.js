
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYR3bSng40frOQmftmGaKJxGLT7WW8--k",
  authDomain: "stellar-39682.firebaseapp.com",
  projectId: "stellar-39682",
  storageBucket: "stellar-39682.firebasestorage.app",
  messagingSenderId: "461504642752",
  appId: "1:461504642752:web:73a6eaea4cb68cf3787725"
};

async function repair() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    const companyId = "4q2sL8o6uuhqdYeJ3lvI"; // Matrix Solutions ID from my scan
    const walletAddr = "GB5H54HNJMNINL4CURQ34YCH3BBUDNV3CMENBIAH4YO6F37S5E2MMAVV";
    
    console.log(`Repairing company doc ${companyId}...`);
    await updateDoc(doc(db, "companies", companyId), {
      walletAddress: walletAddr,
      rpt: 3 // Setting it to the current on-chain balance
    });
    
    console.log("Repair complete! Wallet Address and RPT linked.");
  } catch (e) {
    console.error("Repair failed:", e.message);
  }
}

repair();
