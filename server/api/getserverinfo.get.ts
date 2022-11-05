import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event);
    const serverid = query.serverid!.toString();

    const firebaseData = await firestore.doc(`rooms/${serverid}`).get();
    let members: {
      uid: string;
      perms: { read: boolean; write: boolean };
    }[] = [];

    const data = firebaseData.data()!.members;

    for (let key in data) {
      members.push({ uid: key, perms: data[key].perms });
    }

    const response = {
      members,
      error: null,
    };

    return response;
  } catch (e) {
    event.res.statusCode = 400;
    return {
      members: [],
      error: e,
    };
  }
});
