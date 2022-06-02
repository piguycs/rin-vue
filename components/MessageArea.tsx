import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/MessageArea.module.css";
import Message from "./repeated/Message";
import { connect } from "socket.io-client";
import { UsernameContext } from "../utils/contexts/UsernameContext";

export default function MessageArea() {
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const msgBox = useRef(null);
  
  const {username}:any = useContext(UsernameContext)

  // this pushes the message on to the network
  const pushMsgNet = async (message: string, username:string) => {
  };

  // the function which sends message
  const sendMessage = (content: string, sentbyme = true) => {
    if (username === "") {
      alert("Please enter a username")
      return
    }
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
