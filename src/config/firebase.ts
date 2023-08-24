import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyAJxoJsYk8XAyFwxMk8fCmh2F8IaCxncg0',
	authDomain: 'test-davide-ghiotto.firebaseapp.com',
	projectId: 'test-davide-ghiotto',
	storageBucket: 'test-davide-ghiotto.appspot.com',
	messagingSenderId: '507675193838',
	appId: '1:507675193838:web:0ad24c3dd4afea80545eff',
	measurementId: 'G-4T0KJZ8R1K',
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
