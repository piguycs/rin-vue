import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/MessageArea.module.scss";
import Message from "../../components/repeated/Message";
import { connect } from "socket.io-client";
import { UserContext } from "../../utils/contexts/UserContext";

// socketio instance
const socket = connect(process.env.NEXT_PUBLIC_BACKEND_URL, {
  path: "/ws/socket.io",
  autoConnect: false,
});

type msgtype = {
  content: string;
  sender: {
    pfp: string;
    name: string;
    id: string;
  };
  room: string;
};

export default function MessageArea() {
  const [messages, setMessages] = useState<JSX.Element[]>([]);

  const msgBox = useRef<HTMLInputElement>(null);

  const { username, avatar }: any = useContext(UserContext);
  
  socket.on("message", (msg: msgtype) => {
    pushMsgNet(msg);
  });
  socket.on("system", (msg) => {
    console.debug(msg);
  });
  socket.on("connect", () => {
    console.info("the client has connected to the server");
  });

  // socketio events
  useEffect(() => {
    socket.connect();
    // cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  // this pushes the message on to the network
  let pushMsgNet = async (msg: msgtype) => {
    // this is the object which will be sent to the shit

    // this adds to the end of the message pile
    setMessages([
      ...messages,
      <Message key={`msg_${messages.length}`} message={msg} />,
    ]);

    // reset the message box
    msgBox.current!.value = "";
  };

  // the function which sends message
  // this is the one which is triggred on the
  // input event
  const sendMessage = (msg: msgtype, sentbyme = true) => {
    if (username === "") {
      alert("Please enter a username");
      return;
    }
    socket.emit("send_message", msg);
    // sentbyme && pushMsgNet(msg);
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
            sendMessage({
              content: value,
              sender: {
                pfp: avatar,
                name: username,
                id: "idk",
              },
              room: "69420",
            });
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
