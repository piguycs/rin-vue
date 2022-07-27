// firebase.client.ts
import { getApps, initializeApp } from "firebase/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.APIKEY,
    projectId: config.PROJECTID,
    storageBucket: config.STORAGEBUCKET,
  };
  const apps = getApps();
  const app = apps[0] ? apps[0] : initializeApp(firebaseConfig);
});
