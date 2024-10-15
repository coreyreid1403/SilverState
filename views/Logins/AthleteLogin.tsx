import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../styles/pages/login.module.css";

function AthleteLogin(props: any){
return (
<>
  <input
    className={
      styles.createContainerFormContainerFormName
    }
    type="text"
    placeholder="Athlete Id"
    required
    id="athleteId"
  />
  <input
    className={
      styles.loginContainerMainContainerFormContainerFormPassword
    }
    type="test"
    placeholder="Fundraiser Id"
    required
    id="fundraiserId"
  />
</>
);
}

export default AthleteLogin;

AthleteLogin.propTypes ={}