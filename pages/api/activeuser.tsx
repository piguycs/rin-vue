import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { supabase } from "../../utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const user = supabase.auth.session();
  
  console.log(user)

  console.log({user: user ? true : false})
  res.send({user: user ? true : false});
};
