import { useContext, useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import { UserContext } from "../utils/contexts/UserContext";
import Image from "next/image";
import { supabase } from "../utils/supabase";

export default function Profile() {
  const { username, setUsername, avatar, setAvatar }: any =
    useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = supabase.auth.session()?.user?.id;
    if (true) {
      const getstuff = async () => {
        try {
          const user = await fetch(`/api/getuser?id=${id}`);
          const res = await user.json();

          const avatar = res.avatar_url;
          const username = res.username;
          setAvatar(avatar);
          setUsername(username);
          setIsLoaded(true);
        } catch (err) {
          console.log(err);
          setIsLoaded(true);
        }
      };
      getstuff();
    }
  }, []);

  return (
    <div className={styles.profile}>
      <div style={{ display: "flex"}}>
        <Image
          src={avatar}
          width={32}
          height={32}
          style={{ borderRadius: "50%", visibility: isLoaded ? "visible" : "hidden" }}
        />
      </div>
      <span className="uname">{isLoaded ? username : null}</span>
    </div>
  );
}
