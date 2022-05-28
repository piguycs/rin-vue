import { useContext, useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import { UsernameContext } from "../utils/contexts/UsernameContext";
import Image from "next/image";
import { supabase } from "../utils/supabase";

export default function Profile() {
  const { username, setUsername }: any = useContext(UsernameContext);
  const [isUserAuthed, setUserAuth] = useState(false);
  const [pfp, setPfp] = useState(
    `https://avatars.dicebear.com/api/bottts/${username}.svg`
  );

  useEffect(() => {
    const id = supabase.auth.session()?.user?.id;
    if (true) {
      setUserAuth(true);
      const asfn = async () => {
        const user = await fetch(`/api/getuser?id=${id}`);
        const res = await user.json();

        const avatar = res.avatar_url;
        const username = res.username;
        setPfp(avatar);
        setUsername(username);
      };
      asfn();
    }
  }, [supabase]);

  return (
    <form
      className={styles.profile}
      onSubmit={(e) => {
        e.preventDefault();
        setUsername(username);
      }}
    >
      <label style={{display: "flex"}}>
        <Image
          src={pfp}
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
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
