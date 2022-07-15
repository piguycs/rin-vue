//https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export const createUser = async (
  email: string,
  password: string,
  username: string,
  pfp: string
) => {
  try {
    const res = await useFetch("/api/createuser", {
      body: {
        email,
        password,
        username,
        pfp,
      },
    });
  } catch (e) {
    throw e;
  }
};

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth();

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    return credentials;
  } catch (e) {
    throw e;
  }
};

export const initUser = async () => {
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  firebaseUser.value = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
    } else {
      //if signed out
    }

    firebaseUser.value = user;
  });
};

export const signOutUser = async () => {
  const auth = getAuth();
  try {
    const result = await auth.signOut();
    return result;
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (
  displayName: string | null = null,
  photoURL: string | null = null
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  let toUpd = {
    displayName,
    photoURL,
  };

  await updateProfile(user, toUpd);
  console.info(`updated user`);
};
