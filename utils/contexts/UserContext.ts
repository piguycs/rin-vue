import { User } from "@supabase/supabase-js";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type state = {
  user: User|undefined;
  setUser: Dispatch<SetStateAction<User|undefined>>;
};
export const UserCTX = createContext<state|null>(null)