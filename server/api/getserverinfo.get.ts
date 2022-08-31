import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event);
    const serverid = query.serverid.toString();

    const a = await firestore.doc(`rooms/${serverid}`).get();

    const response = { members: a.data().members as string[], error: null };

    return response;
  } catch (e) {
    event.res.statusCode = 400;
    return {
      members: [],
      error: e,
    };
  }
});
