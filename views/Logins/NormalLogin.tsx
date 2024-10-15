import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../styles/pages/login.module.css";

function NormalLogin(props: any){
return (
<>
  <input
    className={
      styles.loginContainerMainContainerFormContainerFormEmail
    }
    type="email"
    placeholder="Email"
    required
    id="emailInput"
  />
  <input
    className={
      styles.loginContainerMainContainerFormContainerFormPassword
    }
    type="password"
    placeholder="Password"
    required
    id="passwordInput"
  />
</>
);
}

export default NormalLogin;

NormalLogin.propTypes ={}