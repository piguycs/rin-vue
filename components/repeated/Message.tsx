import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const lastmsg = useRef<HTMLDivElement>(null);
  const [showProfile, toggleProfile] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    lastmsg.current!.scrollIntoView();
    setId(message.sender.id);
  }, []);

  useEffect(() => {
    if (showProfile) {
      setTimeout(() => {
        toggleProfile(false);
      }, 2000);
    }
  }, [showProfile]);

  return (
    <div className={styles.msgroot} ref={lastmsg}>
      {message.sender.pfp && (
        <Image
          src={message.sender.pfp}
          className={styles.pfp}
          style={{ borderRadius: "50%" }}
          width={32}
          height={32}
        />
      )}
      <div className={styles.content}>
        {message.sender && (
          <span>
            <span
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => {
                toggleProfile(!showProfile);
              }}
            >
              {message.sender.name}
            </span>
            {(showProfile && id) ? (
              <Link href={`/userprofile/${id}`}>
                <a className={styles.shprof}>profile</a>
              </Link>
            ) : null}
          </span>
        )}
        <span className={styles.msgcontent}>{message.content}</span>
      </div>
    </div>
  );
}
