import { checkCode } from "../utils/usertools";
import { auth } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { email, password, username, code } = await useBody(event);
  const pfp = `https://avatars.dicebear.com/api/croodles/${username.replace(
    / /g,
    "_"
  )}.svg`;

  try {
    // check if invite code is valid
    async function inviteCheck() {
      try {
        const codeCheck = await checkCode(code);
        return codeCheck;
      } catch {
        throw Error("Code check failed");
      }
    }
    // check if username is valid
    async function usernameCheck() {
      try {
        return false;
      } catch {
        throw Error("Username check failed");
      }
    }

    inviteCheck() && usernameCheck();

    try {
      const user = await auth.createUser({
        displayName: username,
        email,
        password,
        photoURL: pfp,
      });
      return {
        success: true,
      };
    } catch (e) {
      throw e;
    }
  } catch (e) {
    console.log(e);
    event.res.statusCode = 400;
    return { success: false, error: e };
  }
});
