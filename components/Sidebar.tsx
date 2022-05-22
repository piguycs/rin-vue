import { useRef, useState } from "react";
import styles from "../styles/App.module.css";
import AddConnScreen from "./AddConnScreen";
import Profile from "./Profile";

export default function Sidebar() {
  const tooltiptext = useRef<HTMLSpanElement>(null);
  const [showConnScreen, setShowConnScreen] = useState<boolean>(false);
  

  var hovertimer: any;

  const tooltipShow = () => {
    tooltiptext.current!.style.visibility = "visible";
    tooltiptext.current!.style.opacity = "1";
  };
  const tooltipHide = () => {
    tooltiptext.current!.style.visibility = "hidden";
    tooltiptext.current!.style.transition = "opacity 0.6s";
    tooltiptext.current!.style.opacity = "0";
  };

  // add connection button
  const addConn = (e: any) => {
    e.preventDefault();
    clearTimeout(hovertimer);
    setShowConnScreen(true);
  };

  return (
    <>
      <AddConnScreen
        showConnScreen={showConnScreen}
        setShowConnScreen={setShowConnScreen}
      />
      <div className={styles.rooms}>
        <button className={styles.addroombtn} onClick={addConn}>
          <span
            onMouseEnter={() => {
              hovertimer = setTimeout(tooltipShow, 3000);
            }}
            onMouseLeave={() => {
              clearTimeout(hovertimer);
              setTimeout(tooltipHide, 1000);
            }}
          >
            Add a connection
          </span>
          <span ref={tooltiptext} className={styles.tooltiptext}>
            Add a connection to your peers to create a message room
          </span>
        </button>
        <Profile />
      </div>
    </>
  );
}
