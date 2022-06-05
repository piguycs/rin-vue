import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/MessageArea.module.css";
import Message from "./repeated/Message";
import { connect } from "socket.io-client";
import { UserContext } from "../utils/contexts/UserContext";

// socketio instance
const socket = connect(process.env.NEXT_PUBLIC_BACKEND_URL, {
  path: "/ws/socket.io",
});

export default function MessageArea() {
  const [messages, setMessages] = useState<JSX.Element[]>([]);

  const msgBox = useRef<HTMLInputElement>(null);

  const { username, avatar }: any = useContext(UserContext);

  // socketio events
  useEffect(() => {
    socket.on("connect", () => {
      console.info("the client has connected to the server");
      socket.emit("auth.join", {})
    });
    
    socket.on("message", (msg) => {
      console.log(msg)
    })
    
    socket.on("system", (msg) => {
      console.debug(msg)
    })
  }, [socket]);

  // this pushes the message on to the network
  const pushMsgNet = async (message: string, username: string) => {
    // this is the object which will be sent to the shit
    const msg = {
      content: message,
      sender: {
        pfp: avatar,
        name: username,
        id: "idk",
      },
      room: "69420",
    };
    

    // this adds to the end of the message pile
    setMessages([...messages, <Message message={msg} />]);

    // reset the message box
    msgBox.current!.value = "";
  };

  // the function which sends message
  // this is the one which is triggred on the
  // input event
  const sendMessage = (content: string, sentbyme = true) => {
    if (username === "") {
      alert("Please enter a username");
      return;
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
