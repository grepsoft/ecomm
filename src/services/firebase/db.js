import  { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "muiecom-a404e.appspot.com",
    messagingSenderId: "500133603182",
    appId: "1:500133603182:web:e578830747757f279b437f"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

async function register({firstname, lastname, email, password}) {
    const resp = await createUserWithEmailAndPassword(auth, email, password);    
    await updateProfile(resp.user,{displayName:`${firstname} ${lastname}`});    
}

async function login({email, password}) {
    const resp = await signInWithEmailAndPassword(auth, email, password);

    return resp.user;
}

async function logout() {
    const resp = await signOut(auth);
}

export const firebasedb = {
    register: register,
    login: login,
    logout: logout,
};