import styles from '../styles/Profile.module.css'

export default function Profile({username, setUsername}:any) {

  return (
    <form className={styles.profile}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </form>
  );
}
