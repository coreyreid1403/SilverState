import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/pages/login.module.css";

function NormalLogin(props: any) {
  return (
    <>
      <input
        className={styles.createContainerFormContainerFormName}
        type="text"
        placeholder="Full Name"
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

export default NormalLogin;

NormalLogin.propTypes = {};
