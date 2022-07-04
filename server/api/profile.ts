import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const { id } = query;

  
  const profile = await prisma.profiles.findUnique({where: {id: id.toString()}})

  return {
    profile
  };
});
