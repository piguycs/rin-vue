import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  try {
    const profile = await prisma.profiles.findUnique({ where: { id: id } });
    res.status(200).send(profile);
  } catch {
    res.status(418).send("idk");
  }
};
