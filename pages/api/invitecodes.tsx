import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.headers.authorization === "HALO") {
      const body = req.body;
      const code = await JSON.parse(body).code
      
      const response = await prisma.invites.findUnique({where: {invite_key: code}})
      
      res.status(200).send({err: null, success: response ? true : false})
    } else {
      res.status(403).json({ err: "unauthorised", success: false });
    }
  } else {
    res.status(403).json({ err: "unauthorised", success: false });
  }
};
