import { UserRecord } from "firebase-admin/auth";
import { firestore, auth } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { uid } = await useBody<{ uid: string }>(event);

  const doc = firestore.doc("rooms/0");

  let members: { [key: string]: { perms: { write: boolean; read: boolean } } } =
    (await doc.get()).data()!.members;

  let user: UserRecord | null;
  try {
    user = await auth.getUser(uid);
  } catch {
    user = null;
  }

  console.log(members);
  if (user) {
    members[uid] = { perms: { write: false, read: true } };
  }

  try {
    await doc.update({
      members,
    });

    return { success: true };
  } catch {
    return { success: false };
  }
});
