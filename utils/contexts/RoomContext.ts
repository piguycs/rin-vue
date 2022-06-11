import { createContext, Dispatch, SetStateAction, useState } from "react";

type state = {
  room: string
  setRoom: Dispatch<SetStateAction<string>>
  roomList: string[]
  setRoomList: Dispatch<SetStateAction<string[]>>
}

export const RoomCtx = createContext<state|null>(null)