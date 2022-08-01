import { checkCode } from "../utils/usertools";

export default defineEventHandler(async (event) => {
  const { email, password, username, code } = await useBody(event);
  const pfp = `https://avatars.dicebear.com/api/croodles/${username}.svg`;

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
    

    return {
      email,
      password,
      username,
      code,
      pfp,
    };
  } catch (e) {
    event.res.statusCode = 400;
    return { error: e };
  }
});
