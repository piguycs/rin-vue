import { createContext, Dispatch, SetStateAction, useContext } from "react";

type state = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

export const UsernameContext = createContext<state|null>(null)