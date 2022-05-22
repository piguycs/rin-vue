import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/MessageArea.module.css";
import Message from "./repeated/Message";
import { connect } from "socket.io-client";
import { UsernameContext } from "../utils/UsernameContext";

export default function MessageArea() {
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const msgBox = useRef(null);
  
  const {username, setUsername}:any = useContext(UsernameContext)
  
  useEffect((): any => {
    const socket = connect("localhost:3000", {
      path: "/api/socketio",
    });
    socket.on("message", (message) => {
      let props = {
        content: message.message,
        sender: {
          pfp: "https://avatars.dicebear.com/api/bottts/rin.svg",
          name: message.username,
          id: "id... more like IDK AMIRITE (kmn)",
        },
        room: undefined,
      };
      console.log(props)
      messages.push(<Message message={props} />)
      setMessages([...messages]);
      (msgBox.current! as any).value = "";
    });

    if (socket) return () => socket.disconnect();
  }, []);

  // this pushes the message on to the network
  const pushMsgNet = async (message: string, username:string) => {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message,username }),
    });
  };

  // the function which sends message
  const sendMessage = (content: string, sentbyme = true) => {
    sentbyme && pushMsgNet(content, username);
  };

  return (
    <div className={styles.root}>
      <div className={styles.messages}>
        {messages.map((x: any, i: number) => (
          <div key={i}>{x}</div>
        ))}
      </div>
      <form
        className={styles.textbox}
        onSubmit={(e: any) => {
          e.preventDefault();
          const value = e.target[0].value.toString();
          if (value) {
            sendMessage(value);
          }
        }}
      >
        <input
          type="text"
          className={styles.msginpt}
          placeholder="Message anyone"
          ref={msgBox}
        />
        <input type="submit" className={styles.sendbtn} value="SEND" />
      </form>
    </div>
  );
}
