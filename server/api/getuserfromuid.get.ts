import { auth } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  try {
    if (query.uid) {
      const uid = query.uid.toString();

      const user = await auth.getUser(uid);

      return {
        name: user.displayName,
        pfp: user.photoURL,
      };
    } else {
      throw "no uid provided";
    }
  } catch (e) {
    event.res.statusCode = 404;
    console.log(e);
    return {
      error: e,
    };
  }
});
