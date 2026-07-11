
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYR3bSng40frOQmftmGaKJxGLT7WW8--k",
  authDomain: "stellar-39682.firebaseapp.com",
  projectId: "stellar-39682",
  storageBucket: "stellar-39682.firebasestorage.app",
  messagingSenderId: "461504642752",
  appId: "1:461504642752:web:73a6eaea4cb68cf3787725"
};

async function listAllJobs() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const snap = await getDocs(collection(db, "jobs"));
  console.log(`Found ${snap.size} jobs.`);
  snap.forEach(doc => {
    const data = doc.data();
    console.log(`[${doc.id}] ${data.title} | Company: ${data.companyAddress} | Status: ${data.status}`);
  });
}

listAllJobs();
