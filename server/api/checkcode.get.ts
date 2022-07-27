import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const code = query.code.toString();

  const snapshot = await firestore.collection("invites").get();

  try {
    if (code === undefined) throw new Error("Code is undefined");

    const codeList = snapshot.docs.map((e) => {
      return {
        code: e?.id,
        data: e?.data(),
      };
    });
    let valid: boolean;

    // check if code is valid
    const codes = codeList.map(({ code }) => code);
    const checkUses = (data: typeof codeList, code: string): boolean => {
      const index = codes.indexOf(code);
      const currData = data[index].data;

      const usesLeft = currData.max_uses - currData.used.length;
      
      return usesLeft > 0;
    };
    if (codes.includes(code) && checkUses(codeList, code)) {
      valid = true;
    } else {
      valid = false;
    }

    return {
      valid,
      error: null,
    };
  } catch (e) {
    event.res.statusCode = 400;
    return {
      valid: false,
      error: e,
    };
  }
});
