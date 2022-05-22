import { useContext } from "react";
import styles from "../styles/Profile.module.css";
import { UsernameContext } from "../utils/UsernameContext";

export default function Profile() {
  const { username, setUsername }: any = useContext(UsernameContext);

  return (
    <form
      className={styles.profile}
      onSubmit={(e) => {
        e.preventDefault();
        setUsername(username);
      }}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </form>
  );
}
