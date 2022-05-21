import MessageArea from "../../components/MessageArea";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/App.module.css";

export default function App() {
  return (
    <div className={styles.root}>
      <Sidebar />
      <MessageArea />
    </div>
  );
}
