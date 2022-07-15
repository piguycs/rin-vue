import { initializeApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

const config = useRuntimeConfig();
const app = initializeApp({
  apiKey: config.APIKEY,
});
const auth = getAuth(app);

export default defineEventHandler(async (event) => {
  try {
    // check if invite code is valid
    // this is a fallback which will happen all server side
    // the invite check which happens (usually) in the previous request
    // is just an api response to the client which can be spoofed
    async function inviteCheck() {
      // TODO
      return false;
    }
    
    if (!(await inviteCheck())) {
      throw "Invite invalid"
    }

    const { email, password, username, pfp } = await useBody(event);

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateUser(username, pfp);

    return { user };
  } catch (e) {
    event.res.statusCode = 500;
    return { error: e };
  }
});
