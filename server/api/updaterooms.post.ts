import { UserRecord } from "firebase-admin/auth";
import { firestore, auth } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { uid } = await useBody<{ uid: string }>(event);

  const doc = firestore.doc("rooms/0");

  let members: string[] = (await doc.get()).data().members;

  let user: UserRecord
  try {
    user = await auth.getUser(uid);
  } catch {
    user = null;
  }

  if (!members.includes(uid) && user) {
    members = [...members, uid];
  }

  await doc.update({
    members,
  });

  return {
    api: "Hi Mom!",
  };
});
