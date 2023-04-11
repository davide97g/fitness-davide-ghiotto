import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { WeightType } from "../types/weight";

const firebaseConfig = {
  apiKey: "AIzaSyDu6znSiDhICU9xdVAASJe2SDB29H1ZeTE",
  authDomain: "davide-ghiotto.firebaseapp.com",
  databaseURL: "https://davide-ghiotto.firebaseio.com",
  projectId: "davide-ghiotto",
  storageBucket: "davide-ghiotto.appspot.com",
  messagingSenderId: "970217944687",
  appId: "1:970217944687:web:cb454e2125b6f474adbf9a",
  measurementId: "G-BF8TLW8NPP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const DatabaseClient = {
  Weights: {
    get: async () => {
      return getDocs(collection(db, "weights"))
        .then((snapshot) => snapshot.docs.map((doc) => doc.data()))
        .catch((error) => {
          console.log(error);
          throw error;
        });
    },
    add: async (record: WeightType) => {
      return setDoc(doc(db, "weights", record.date), record, {
        merge: true,
      }).catch((error) => {
        console.log(error);
        throw error;
      });
    },
  },
};
