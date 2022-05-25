import { createContext, useState } from "react";

const [roomid, setRoomid] = useState("")
export const RoomCtx = createContext(roomid)

const [roomslist, setRoomslist] = useState([])
export const RoomListCtx = createContext(roomslist)