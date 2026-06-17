import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYR3bSng40frOQmftmGaKJxGLT7WW8--k",
  authDomain: "stellar-39682.firebaseapp.com",
  projectId: "stellar-39682",
  storageBucket: "stellar-39682.firebasestorage.app",
  messagingSenderId: "461504642752",
  appId: "1:461504642752:web:73a6eaea4cb68cf3787725"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;

// fix: routing issue on direct /dashboard/worker URL visit [v1.4.32-2026-05-08]

// feat: add transaction history tab to worker dashboard [v5.2.5-2026-05-14]

// style: update header gradient to match new brand colors [v6.4.83-2026-05-17]

// docs: add contract interaction guide to README [v5.1.5-2026-05-28]

// feat: introduce NFT badge tier system for reputation [v7.2.14-2026-06-02]

// fix: XLM amount input allowing negative values [v7.7.7-2026-06-17]
