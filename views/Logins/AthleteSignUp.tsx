import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/pages/login.module.css";

function AthleteLogin(props: any) {
  return (
    <>
      <input
        className={styles.createContainerFormContainerFormName}
        type="text"
        placeholder="Name"
        id="nameInput"
        required
      />
      <input
        className={styles.createContainerFormContainerFormEmail}
        type="email"
        placeholder="Email"
        id="emailInput"
        required
      />
      <input
        className={styles.createContainerFormContainerFormPassword}
        type="password"
        placeholder="Password"
        id="passwordInputSignUp"
        required
      />
    </>
  );
}

export default AthleteLogin;

AthleteLogin.propTypes = {};
