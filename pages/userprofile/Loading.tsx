// TODO: make a loading/buffer animation
import styles from "../../styles/UserProfile.module.scss";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { connect } from "socket.io-client";

const socket = connect(process.env.NEXT_PUBLIC_BACKEND_URL, {
  path: "/ws/socket.io",
  autoConnect: false,
});
export default function UserProfile({ userid }: any) {
  const [pfp, setPfp] = useState(
    "https://avatars.dicebear.com/api/bottts/rin.svg"
  );
  const [username, setUName] = useState("");
  const [desc, setDesc] = useState("");
  const [badges, setBadges] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const id = userid??supabase.auth.user()?.id;
  const getpfp = async () => {
    try {
      const res = await fetch(`/api/getuser?id=${id}`);
      const data = await res.json();

      const avatar = data.avatar_url;
      const uname = data.username;
      const badge = data.badges;
      const description = data.desc;
      setPfp(avatar);
      setDesc(description);
      setUName(uname);
      setBadges(badge);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
      setIsLoaded(true);
    }
  };
  
  useEffect(() => {
    if (id) {
      getpfp()
    }
  },[id])


  // functions for doing actions on the user
  const addFriend = () => {
    socket.on("connect", () => {
      socket.emit("auth", {});
    });
    socket.emit("add_friend", {
      sent_to: "",
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.profile}>
        <div className={styles.topdiv}>
          {/* <span className={styles.pfpedit}>edit</span> */}
          <img
            className={styles.pfp}
            src={isLoaded ? pfp : ""}
            width={220}
            height={220}
          />
        </div>
        <div className={styles.bottomdiv}>
          <h1 className={styles.username}>{username}</h1>
          <h1
            style={{
              color:
                badges[0] === "creator"
                  ? "rgb(255, 111, 111)"
                  : "hsl(159, 95%, 61%)",
            }}
            className={styles.badges}
          >
            {badges?.length ? badges[0] : null}
          </h1>
          <textarea
            spellCheck={false}
            className={styles.desc}
            value={desc??" "}
            onChange={() => {}}
          />
          <div className={styles.actions}>
            <button onClick={addFriend}>add friend</button>
            <button>invite to room</button>
            <button>message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
