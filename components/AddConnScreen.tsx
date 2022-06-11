import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import styles from "../styles/AddConnScreen.module.scss";
import { UserContext } from "../utils/contexts/UserContext";

type props = {
  showConnScreen: boolean;
  setShowConnScreen: Dispatch<SetStateAction<boolean>>;
};

export default function AddConnScreen({
  showConnScreen,
  setShowConnScreen,
}: props) {
  const floating = useRef<HTMLDivElement>(null);
  const roomInpt = useRef<HTMLInputElement>(null);

  const { rooms }: any = useContext(UserContext);
  const { currRoom, setCurrRoom } = rooms || {
    currRoom: "0",
    setCurrRoom: () => {},
  };

  useEffect(() => {
    if (showConnScreen) {
      floating.current!.style.display = "flex";
    } else {
      floating.current!.style.display = "none";
    }
  }, [showConnScreen]);

  const addRoomSubmit = (e: any) => {
    e.preventDefault();

    setCurrRoom(roomInpt.current!.value);
  };

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
          <input
            className={styles.idinpt}
            type="text"
            placeholder={currRoom}
            ref={roomInpt}
          />
          <input className={styles.submitbtn} type="submit" value="SEARCH" />
        </form>
      </div>
    </div>
  );
}
