import styles from "../styles/MessageArea.module.css";

export default function MessageArea() {
  const sendMessage = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={styles.root}>
      <div className={styles.messages}></div>
      <form className={styles.textbox} onSubmit={sendMessage}>
        <input
          type="text"
          className={styles.msginpt}
          placeholder="Message anyone"
        />
        <input type="submit" className={styles.sendbtn} value="SEND" />
      </form>
    </div>
  );
}
