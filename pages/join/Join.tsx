import styles from "../../styles/Login.module.css";
import inputStyles from "../../styles/FancyInputBoxes.module.scss";
import { useState } from "react";

export default function Join() {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const checkInvite = async () => {
    setLoading(true);
    const res = await fetch("/api/invitecodes", {
      method: "POST",
      body: JSON.stringify({ code: inviteCode }),
      credentials: "same-origin",
      headers: {
        Authorization: "HALO"
      },
    });
    (await res.json()).success ? alert("VALID") : alert("INVALID")
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
              className={inputStyles.inputerror}
              style={loading ? { visibility: "visible" } : {}}
            >
              loading
            </span>
          </label>

          {/* EMAIL INPUT BOX */}
          <label className={inputStyles.input}>
            <input
              className={inputStyles.input__field}
              type="text"
              placeholder=""
            />
            <span className={inputStyles.input__label}>Email</span>
            <span className={inputStyles.inputerror}>email is invalid</span>
          </label>

          <label>
            <input
              className={inputStyles.submit}
              type="submit"
              value="Get Invite Link"
            />
          </label>
        </form>
      </div>
    </div>
  );
}
