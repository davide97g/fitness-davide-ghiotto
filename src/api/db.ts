import { User } from 'firebase/auth';
import {
	addDoc,
	collection,
	deleteDoc,
	getDocs,
	getFirestore,
	onSnapshot,
	query,
	setDoc,
	Unsubscribe,
	where,
} from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { WeightRecord } from '../models/weight';

const db = getFirestore();

export const DataBaseClient = {
	User: {
		async getUser(uid: string): Promise<User | null> {
			const docRef = doc(db, 'users', uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) return docSnap.data() as User;
			else return null;
		},
		async getUserOrCreateOne(firebaseUser: User): Promise<User> {
			const docRef = doc(db, 'users', firebaseUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) return docSnap.data() as User;
			else return this.createNewUser(firebaseUser);
		},
		async createNewUser(firebaseUser: User): Promise<User> {
			await setDoc(doc(collection(db, 'users'), firebaseUser.uid), firebaseUser);
			return firebaseUser;
		},
		async getAllUsers(): Promise<User[]> {
			const querySnapshot = await getDocs(collection(db, 'users'));
			return querySnapshot.docs.map(doc => doc.data()) as User[];
		},
	},
	WeightRecord: {
		collection: 'weights',
		async get(filters?: {
			day?: string;
			month?: string;
			year?: string;
		}): Promise<WeightRecord[]> {
			const constraints = [];
			if (filters?.day) constraints.push(where('day', '==', filters.day));
			if (filters?.month) constraints.push(where('month', '==', filters.month));
			if (filters?.year) constraints.push(where('year', '==', filters.year));
			const q = query(collection(db, this.collection), ...constraints);
			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			})) as WeightRecord[];
		},
		async getRT(
			callback: (weights: WeightRecord[]) => void,
			filters?: {
				day?: string;
				month?: string;
				year?: string;
			}
		): Promise<Unsubscribe> {
			const constraints = [];
			if (filters?.day) constraints.push(where('day', '==', filters.day));
			if (filters?.month) constraints.push(where('month', '==', filters.month));
			if (filters?.year) constraints.push(where('year', '==', filters.year));
			const q = query(collection(db, this.collection), ...constraints);
			return onSnapshot(q, querySnapshot => {
				const weights = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				})) as WeightRecord[];
				callback(weights);
			});
		},
		async create(weightRecord: WeightRecord): Promise<void> {
			try {
				await setDoc(
					doc(collection(db, this.collection), weightRecord.id),
					JSON.parse(JSON.stringify(weightRecord))
				);
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
		async update(weightRecord: WeightRecord): Promise<boolean> {
			try {
				await setDoc(
					doc(collection(db, this.collection), weightRecord.id),
					JSON.parse(JSON.stringify(weightRecord)),
					{
						merge: true,
					}
				);
				return true;
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
		async delete(transactionId: string): Promise<boolean> {
			try {
				await deleteDoc(doc(collection(db, this.collection), transactionId));
				return true;
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
		async bulkAdd(weights: WeightRecord[]): Promise<void[]> {
			try {
				const transactionsCreation: Promise<void>[] = [];
				weights.forEach(weightRecord => this.create(weightRecord));
				return await Promise.all(transactionsCreation);
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
	},
};
