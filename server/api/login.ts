import { supabase } from "../../utils/supabase";
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // const body = useQuery(event);
  // const { email, password } = body;

  // let { user, error } = await supabase.auth.signIn({
  //   email: email.toString(),
  //   password: password.toString(),
  // });
  // console.log(error)
  // // console.log(user)
  // 
  // 
  // const profile = await prisma.profiles.findUnique({where: {id: user.id}})

  return {
    profile: ""
  };
});
