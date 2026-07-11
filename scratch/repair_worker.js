
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

async function repairWorker() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    const workerId = "0gBtQ1TldzELmwB7D6Mr"; // Jhonny Doe ID
    const walletAddr = "GCPU2MBD5MYVTCBOUHLOMWULXRVNQTXRJAHWAMA2PRUSD2KHQSOQXAJE";
    
    console.log(`Repairing worker doc ${workerId}...`);
    await updateDoc(doc(db, "users", workerId), {
      walletAddress: walletAddr,
      rpt: 2 // Setting it to current on-chain balance
    });
    
    console.log("Worker Repair complete!");
  } catch (e) {
    console.error("Worker Repair failed:", e.message);
  }
}

repairWorker();
