import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "../../styles/repeated/Message.module.scss";

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
  const lastmsg = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    lastmsg.current!.scrollIntoView()
  })

  return (
    <div className={styles.msgroot} ref={lastmsg}>
      {message.sender.pfp && (
        <Image
          src={message.sender.pfp}
          style={{ borderRadius: "50%" }}
          width={32}
          height={32}
        />
      )}
      <div className={styles.content}>
        {message.sender && (
          <span style={{ fontWeight: "bold" }}>{message.sender.name}: </span>
        )}
        <span>{message.content}</span>
      </div>
    </div>
  );
}
