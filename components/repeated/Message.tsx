import Image from "next/image";
import { useEffect } from "react";
import { io } from "socket.io-client";


type message = {
  message: {
    content: string;
    sender: {
      pfp: string;
      name: string;
      id: string;
    };
    room: string | undefined;
  };
};

export default function Message({ message }: message) {
  return (
    <div>
      {message.sender.pfp && <Image src={message.sender.pfp} width={32} height={32} />}
      {message.sender && <span style={{fontWeight: "bold"}}>{message.sender.name}: </span>}
      <span>{message.content}</span>
    </div>
  );
}
