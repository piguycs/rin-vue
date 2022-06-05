import styles from "../../styles/Login.module.css";
import inputStyles from "../../styles/FancyInputBoxes.module.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
import { supabase } from "../../utils/supabase";
import Link from "next/link";


export default function Login() {
  const [showPsswd, togglePsswd] = useState<"password" | "text">("password");
  const [canChangeText, setCCT] = useState(true);
  const [others, setOthers] = useState(false);

  const textlist = ["start chatting", "connect", "experience the next gen"];
  const [marketing, setMarketing] = useState(textlist[0]);

  const psswdincorrect = useRef<HTMLSpanElement>(null);
  const unameincorrect = useRef<HTMLSpanElement>(null);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const [user, setUser] = useState<any>()
  
  useEffect(() => {
    console.log(supabase.auth.session()?.user?.id)
  },[])

  

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      setUser(user ? user : undefined)
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    psswdincorrect.current!.style.visibility = "visible";
    handleLogin()
  };

  useEffect(() => {
    if (showPsswd === "text") {
      setTimeout(() => {
        togglePsswd("password");
      }, 5000);
    }
  }, [showPsswd]);

  const changeText = (e: any) => {
    if (canChangeText) {
      let incriment = -1;
      if (marketing === textlist[textlist.length - 1]) {
        incriment = 0;
      } else {
        incriment = textlist.indexOf(marketing) + 1;
      }

      setCCT(false);
      setTimeout(() => {
        setCCT(true);
      }, 700);
      setMarketing(textlist[incriment]);
    }
  };

  return (
    <div className={styles.loginroot}>
      <div className={styles.loginbox}>
        <h1>
          Sign In to{" "}
          <span
            style={{ color: "hsl(346, 67%, 65%)" }}
            onPointerEnter={changeText}
          >
            {marketing}
          </span>
        </h1>

        <form className={styles.loginform} onSubmit={submit}>
          {/* EMAIL INPUT BOX */}
          <label className={inputStyles.input}>
            <input
              className={inputStyles.input__field}
              type="text"
              placeholder=" "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <span className={inputStyles.input__label}>Email</span>
            <span ref={unameincorrect} className={inputStyles.inputerror}>
              Email is incorrect
            </span>
          </label>

          {/* PASSWORD INPUT BOX */}
          <label className={inputStyles.input}>
            <input
              className={inputStyles.input__field}
              type={showPsswd}
              placeholder=" "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <span className={inputStyles.input__label}>Password</span>
            <span
              className={inputStyles.showpsswd}
              style={
                showPsswd === "password" ? { color: "hsl(0, 0%, 43%)" } : {}
              }
              onClick={() => {
                if (showPsswd === "password") {
                  togglePsswd("text");
                } else {
                  togglePsswd("password");
                }
              }}
            >
              {showPsswd == "password" ? "﯏" : "﯎"}
            </span>
            <span ref={psswdincorrect} className={inputStyles.inputerror}>
              Password is incorrect
            </span>
          </label>

          <label>
            <input
              className={inputStyles.submit}
              type="submit"
              value="Sign In"
            />
          </label>
        </form>
        <Link href="/join">
        <span
          className={styles.extraslink}
          //onClick={() => {
          //  setOthers(!others);
          //}}
          >
          create an account
        </span>
        </Link>
      </div>

      {others ? (
        <div className={styles.authbox}>Metamask, Github, Gitlab, Google</div>
      ) : null}
    </div>
  );
}
