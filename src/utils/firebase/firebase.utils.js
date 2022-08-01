import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA92xVCUPoNZ9v0BkS43kDjs8KS_Hufjp4',
  authDomain: 'crwn-clothing-db-6f100.firebaseapp.com',
  projectId: 'crwn-clothing-db-6f100',
  storageBucket: 'crwn-clothing-db-6f100.appspot.com',
  messagingSenderId: '159683299988',
  appId: '1:159683299988:web:c12a3722a71f180dde4281',
  measurementId: 'G-E4S3B85J1N',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
//export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};

export const db = getFirestore();
export const CreateUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createAuthUserWithEmailAndPassword(auth, email, password);
};
