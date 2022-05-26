import { useState } from "react";
import MessageArea from "../../components/MessageArea";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/App.module.css";
import { UsernameContext } from "../../utils/contexts/UsernameContext";
import { UserCTX } from "../../utils/contexts/UserContext";
import { User } from "@supabase/supabase-js";

export default function App() {
  const date = String(new Date().getTime());

  const [username, setUsername] = useState(
    `user${date.substring(date.length - 3)}`
  );

  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      <UserCTX.Provider value={{ user, setUser }}>
        <div className={styles.root}>
          <Sidebar />
          <MessageArea />
        </div>
      </UserCTX.Provider>
    </UsernameContext.Provider>
  );
}
