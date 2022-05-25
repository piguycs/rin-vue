import { useContext } from "react";
import styles from "../styles/Profile.module.css";
import { UsernameContext } from "../utils/UsernameContext";
import Image from "next/image";

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
      <label>
        <Image
          src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
          width={32}
          height={32}
        />
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </form>
  );
}
