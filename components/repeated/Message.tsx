import Image from "next/image";
import styles from "../../styles/repeated/Message.module.scss"

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
    <div className={styles.msgroot}>
      {message.sender.pfp && (
        <Image
          src={message.sender.pfp}
          style={{ borderRadius: "50%" }}
          width={32}
          height={32}
        />
      )}
      <div>
        {message.sender && (
          <span style={{ fontWeight: "bold" }}>{message.sender.name}: </span>
        )}
        <span>{message.content}</span>
      </div>
    </div>
  );
}
