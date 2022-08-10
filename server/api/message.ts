import { firestore } from "../utils/firebase";

firestore;

export default defineEventHandler(async (event) => {
  return {
    api: "Hi",
  };
});
