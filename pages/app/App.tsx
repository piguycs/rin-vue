import { useState } from "react";
import MessageArea from "../../components/MessageArea";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/App.module.css";
import { UsernameContext } from "../../utils/contexts/UsernameContext";

const middleware = () => {
  return "fuck off"
}

export default function App() {
  const date = String(new Date().getTime());

  const [username, setUsername] = useState(
    `user${date.substring(date.length - 3)}`
  );

  return (
    // TODO Change the UsernameContext with UserContext
    <UsernameContext.Provider value={{ username, setUsername }}>
        <div className={styles.root}>
          <Sidebar />
          <MessageArea />
        </div>
    </UsernameContext.Provider>
  );
}
