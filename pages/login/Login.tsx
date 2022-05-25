import styles from "../../styles/Login.module.css";
import inputStyles from "../../styles/FancyInputBoxes.module.scss"
import { FormEvent, useRef } from "react";

export default function Login() {
  const psswdincorrect = useRef<HTMLSpanElement>(null)
  const unameincorrect = useRef<HTMLSpanElement>(null)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    psswdincorrect.current!.style.visibility = "visible"
  };

  return (
    <div className={styles.loginroot}>
      <form className={styles.loginbox} onSubmit={submit}>

        <label className={inputStyles.input}>
          <input className={inputStyles.input__field} type="text" placeholder="" />
          <span className={inputStyles.input__label}>Username</span>
          <span ref={unameincorrect} className={inputStyles.inputerror}>Username is incorrect</span>
        </label>

        <label className={inputStyles.input}>
          <input className={inputStyles.input__field} type="text" placeholder="" />
          <span className={inputStyles.input__label}>Password</span>
          <input type="checkbox" className={inputStyles.showpsswd} />
          <span ref={psswdincorrect} className={inputStyles.inputerror}>Password is incorrect</span>
        </label>
    
        <input className={inputStyles.submit} type="submit" value="Login" />

      </form>
    </div>
  );
}
