export default defineEventHandler(async (event) => {
  try {
    // check if invite code is valid
    async function inviteCheck() {}

    // check if username is valid
    async function usernameCheck() {}

    const { email, password, username, code } = await useBody(event);
    const pfp = `https://avatars.dicebear.com/api/croodles/${username}.svg`;

    return {
      email,
      password,
      username,
      code,
      pfp,
    };
  } catch (e) {
    event.res.statusCode = 500;
    return { error: e };
  }
});
