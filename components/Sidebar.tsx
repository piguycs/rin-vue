import styles from '../styles/App.module.css'

export default function Sidebar() {
  var hovertimer:any
  const tooltipShow = () => {
    document.getElementById("tooltiptext")!.style.visibility = "visible";
    document.getElementById("tooltiptext")!.style.opacity = "1";
  };
  const tooltipHide = () => {
    document.getElementById("tooltiptext")!.style.visibility = "hidden";
    document.getElementById("tooltiptext")!.style.transition = "opacity 0.6s";
    document.getElementById("tooltiptext")!.style.opacity = "0";
  };

  // add connection button
  const addConn = (e:any) => {
    e.preventDefault()
    console.log("hello")
  }

  return (
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
          <span id="tooltiptext" className={styles.tooltiptext}>
            Add a connection to your peers to create a message room
          </span>
        </button>
      </div>
  )
}