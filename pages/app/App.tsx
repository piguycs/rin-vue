import { useState } from "react";
import MessageArea from "./MessageArea";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/App.module.scss";
import { UserContext } from "../../utils/contexts/UserContext";

type prop = {
  user: {
    username: string;
    avatar: string;
  } | null;
};

export default function App({ user }: prop) {
  const date = String(new Date().getTime());

  const [username, setUsername] = useState(
    user ? user.username : `user${date.substring(date.length - 3)}`
  );
  const [avatar, setAvatar] = useState(
    user
      ? user.username
      : `https://avatars.dicebear.com/api/bottts/${username}.svg`
  );

  // this is for future features
  const [loading, setLoading] = useState(false);

  return (
    // TODO Change the UsernameContext with UserContext
    <UserContext.Provider
      value={{ username, setUsername, avatar, setAvatar, loading, setLoading }}
    >
      <div className={styles.root}>
        <Sidebar />
        <MessageArea />
      </div>
    </UserContext.Provider>
  );
}
