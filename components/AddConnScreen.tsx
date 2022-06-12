import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import styles from "../styles/AddConnScreen.module.scss";
import inputStyles from "../styles/FancyInputBoxes.module.scss";
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
    let value = roomInpt.current!.value.trim()
    roomInpt.current!.value = value
    value !== currRoom ? setCurrRoom(value || "0"):null;
    setShowConnScreen(false);
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
          <label className={inputStyles.input} style={{margin: 0}}>
            <input
              className={inputStyles.input__sm_field}
              type="text"
              placeholder=" "
              ref={roomInpt}
            />
            <span className={inputStyles.input__label}>Room Number</span>
          </label>

          <input className={styles.submitbtn} type="submit" value="Connect" />
        </form>
      </div>
    </div>
  );
}
