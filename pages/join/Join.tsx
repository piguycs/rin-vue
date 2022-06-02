import styles from "../../styles/Login.module.css";
import inputStyles from "../../styles/FancyInputBoxes.module.scss";
import { useEffect, useState } from "react";

export default function Join() {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteIsValid, setInviteValidity] = useState(false);
  const [inviteError, setInviteError] = useState<false | string>(false);

  // email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const sendErr = (error:any) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // send browser alerts
      alert(error);
    } else {
      // send custom alerts
      alert(error);
    }
  };

  const checkInvite = async () => {
    setLoading(true);
    const res = await fetch("/api/join", {
      method: "POST",
      body: JSON.stringify({
        code: inviteCode,
        email: email,
        password: password,
      }),
      credentials: "same-origin",
      headers: {
        Authorization: "HALO",
      },
    });
    const response = await res.json();
    setInviteValidity(response.success ? true : false);
    if (!inviteIsValid) {
      sendErr(response.error)
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginroot}>
      <div className={styles.loginbox}>
        <h1>Join the community</h1>

        <form
          className={styles.loginform}
          onSubmit={(e) => {
            e.preventDefault();
            checkInvite();
          }}
        >
          {/* CODE INPUT BOX */}
          <label className={inputStyles.input}>
            <input
              className={inputStyles.input__field}
              type="text"
              placeholder=""
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value.toUpperCase());
              }}
            />
            <span className={inputStyles.input__label}>Invite Code</span>
            <span
              className={inputStyles.showpsswd}
              style={{ color: "hsl(0, 0%, 43%)" }}
            >
              {""}
            </span>
            <span
              className={inputStyles.inputerror}
              style={loading ? { visibility: "visible" } : {}}
            >
              {inviteError}
            </span>
          </label>

          {/* EMAIL INPUT BOX */}
          <label className={inputStyles.input}>
            <input
              className={inputStyles.input__field}
              type="text"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={inputStyles.input__label}>Email</span>
            <span className={inputStyles.inputerror}>
              Check if this is correct
            </span>
          </label>

          {/* PASSWORD INPUT BOX */}
          <label className={inputStyles.input}>
            <input
              className={inputStyles.input__field}
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={inputStyles.input__label}>Password</span>
            <span className={inputStyles.inputerror}>
              Check if this is correct
            </span>
          </label>

          <label>
            <input className={inputStyles.submit} type="submit" value="Join" />
          </label>
        </form>
      </div>
    </div>
  );
}
