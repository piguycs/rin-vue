import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const config = useRuntimeConfig();
const serviceAccount = JSON.parse(config.SERVICEACCOUNT);

export const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "rin-backend.appspot.com",
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
