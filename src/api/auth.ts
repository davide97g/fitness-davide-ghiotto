import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '../stores/user';
import { HomePageName, router } from '../router';
import { setIsLoading } from '../services/utils';

const provider = new GoogleAuthProvider();

import { DataBaseClient } from './db';
import { auth } from '../config/firebase';

export const checkUserIsLoggedIn = () => {
	return new Promise((resolve, reject) => {
		setIsLoading(true);
		onAuthStateChanged(
			auth,
			async fireUser => {
				setIsLoading(false);
				if (fireUser) {
					DataBaseClient.User.getUserOrCreateOne({
						uid: fireUser.uid,
						email: fireUser.email || '',
						displayName: fireUser.displayName || '',
						photoURL: fireUser.photoURL || '',
					})
						.then(user => {
							useUserStore().setUser(user);
							resolve(user);
						})
						.catch(err => {
							console.log(err);
							resolve(fireUser);
						});
				} else reject(false);
			},
			err => {
				useUserStore().setUser(null);
				setIsLoading(false);
				reject(err);
			}
		);
	});
};

export const FirebaseAuth = {
	signInWithGoogle: () =>
		signInWithPopup(auth, provider)
			.then(result => GoogleAuthProvider.credentialFromResult(result))
			.catch(() => {
				useUserStore().setUser(null);
				return null;
			}),

	signOut: () => {
		signOut(auth).then(() => {
			router.push({ name: HomePageName });
			useUserStore().setUser(null);
		});
	},
};
