import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const { content, sender } = await useBody<{
    content: { message: string; hash: string; timestamp: string };
    sender: string;
  }>(event);

  console.log(`${sender} sent ${content.message} at ${content.timestamp}`);

  return {
    api: "Hi",
  };
});
