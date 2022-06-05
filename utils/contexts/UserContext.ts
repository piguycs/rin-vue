import { createContext, Dispatch, SetStateAction, useContext } from "react";

type state = {
  username: string
  setUsername: Dispatch<SetStateAction<string>>
  avatar: string
  setAvatar: Dispatch<SetStateAction<string>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
};

export const UserContext = createContext<state|null>(null)