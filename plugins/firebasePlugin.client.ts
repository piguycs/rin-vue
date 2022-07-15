import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.APIKEY,
  };

  // Initialize Firebase
  
  if (getApps().length > 0) {
    return
  }

  const app = initializeApp(firebaseConfig);
  
  initUser()

  const auth = getAuth(app)
  const firestore = getFirestore(app)

  return {
    provide: {
      auth,
      firestore
    }
  }

});
