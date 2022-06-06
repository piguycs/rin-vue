import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "../styles/AddConnScreen.module.scss";

type props = {
  showConnScreen: boolean;
  setShowConnScreen: Dispatch<SetStateAction<boolean>>;
};

export default function AddConnScreen({
  showConnScreen,
  setShowConnScreen,
}: props) {
  const floating = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showConnScreen) {
      floating.current!.style.display = "flex";
    } else {
      floating.current!.style.display = "none";
    }
  }, [showConnScreen]);

  const addRoomSubmit = (e:any) => {
    e.preventDefault()
  }

  return (
    <div ref={floating} className={styles.floating}>
      <div>
        <span
          onClick={() => {
            setShowConnScreen(false);
          }}
          className={styles.backlink}
        >
          back
        </span>
        <form className={styles.roomform} onSubmit={addRoomSubmit}>
          <input className={styles.idinpt} type="text" placeholder="Public ID" />
          <input className={styles.submitbtn} type="submit" value="SEARCH" />
        </form>
      </div>
    </div>
  );
}
