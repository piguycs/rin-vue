import { checkCode } from "../utils/usertools";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const code = query.code.toString();

  try {
    const valid = await checkCode(code);
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
