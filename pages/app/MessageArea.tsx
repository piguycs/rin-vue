import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/MessageArea.module.scss";
import Message from "../../components/repeated/Message";
import { connect } from "socket.io-client";
import { UserContext } from "../../utils/contexts/UserContext";

// socketio instance
const socket = connect(process.env.NEXT_PUBLIC_BACKEND_URL, {
  // path: "/ws/socket.io",
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

  // wip - indicator for message sent/recive action
  // useful on slow connections or during high load
  const [msgSeRe, setMsgSeRe] = useState(false);

  const msgBox = useRef<HTMLInputElement>(null);

  const { username, avatar, rooms }: any = useContext(UserContext);

  const { currRoom } = rooms || { currRoom: "0" };

  // because react rerenders the components when state changes
  // this is the best way to stop weirdness
  socket.off("message").on("message", (msg: msgtype) => {
    pushMsgNet(msg);
  });
  socket.off("system").on("system", (msg) => {
    console.debug(msg);
  });
  socket.off("connect").on("connect", () => {
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

  const [once, toggleOnce] = useState(false);
  useEffect(() => {
    if (once) {
      socket.emit("join", currRoom);
      console.info(
        `disconnecting from current room and joining room ${currRoom}`
      );
    }

    toggleOnce(true);
  }, [currRoom]);

  // this pushes the message on to the network
  let pushMsgNet = async (msg: msgtype) => {
    const msguid = `msg_${messages.length}`;

    // this adds to the end of the message pile
    setMessages([
      ...messages,
      <Message key={msguid} message={msg} />,
    ]);
    
    
  };

  // the function which sends message
  // this is the one which is triggred on the
  // input event
  const sendMessage = (msg: msgtype) => {
    if (username === "") {
      alert("Please enter a username");
      return;
    }
    socket.emit("send_message", msg);
    setMsgSeRe(false);
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
          const value = e.target[0].value.trim();
          if (value) {
            setMsgSeRe(true);
            sendMessage({
              content: value,
              sender: {
                pfp: avatar,
                name: username,
                id: "idk",
              },
              room: currRoom,
            });

            // reset the message box
          }
          e.target[0].value = "";
        }}
      >
        <input
          type="text"
          className={styles.msginpt}
          placeholder="Message anyone"
          ref={msgBox}
          maxLength={512}
        />
        <input type="submit" className={styles.sendbtn} value="SEND" />
      </form>
    </div>
  );
}
