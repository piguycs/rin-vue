import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // when not post coz need body
    if (req.method !== "POST") {
      throw [400, { error: "wrong method" }];
    }

    const body = await JSON.parse(req.body);
    const code = body.code;
    const response = await prisma.invites.findUnique({
      where: { invite_key: code },
    });

    // when forbidden
    if (req.headers.authorization !== "HALO") {
      throw [403, { error: "forbidden" }];
    }

    if (!response) {
      throw [406, { error: "Invite code is not valid", code_validity: false }];
    }

    const max_uses = response.max_uses;
    const created_users = response.created_users ?? [];
    const codeUsesRemaining = max_uses - created_users.length;

    if (codeUsesRemaining <= 0) {
      throw [
        406,
        { error: "Invite code has already been used", code_validity: false },
      ];
    }

    // all errors have been thrown
    // this also means code is valid

    // check for email/password
    const email = body.email
    const password = body.password;

    if (email === "" && email === "") {
      throw [406, { error: "Email/Password is not provided" }];
    }
    
    if (created_users.includes(email)) {
      throw [409, {error: "User already exists"}]
    }

    const {user, error, session} = await supabase.auth.signUp({ email, password });
    
    if (error) {
      throw [406, error];
    }

    // after user is created, the code gets removed
    if (response) {
      await prisma.invites.update({
        where: { invite_key: code },
        data: { created_users: [...created_users, email]},
      });
    }

    // success
    res
      .status(200)
      .send({ error: null, code_validity: true, createdUser: true });
  } catch (e: any) {
    res.status(e[0]).send(e[1]);
  }
};
