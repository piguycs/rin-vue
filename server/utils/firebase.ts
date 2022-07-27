import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

export const app = initializeApp({
  credential: cert("./service-account.json"),
  storageBucket: "rin-backend.appspot.com",
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
