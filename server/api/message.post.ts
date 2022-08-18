import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { content } = await useBody(event);
  
  return {
    api: "Hi",
  };
});
