import { auth } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const name = query.name.toString().toLowerCase();

  const users = (await auth.listUsers()).users;
  const namesList = users.map(({ displayName }) => displayName.toLowerCase());

  let valid = true;
  // console.log(query);
  if (namesList.includes(name) || name.length <= 0) {
    valid = false;
  }

  try {
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
