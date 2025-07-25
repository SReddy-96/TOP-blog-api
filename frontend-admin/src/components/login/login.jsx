import { Form } from "react-router-dom";
import styles from "./login.module.css";
import button from "../../assets/styles/button.module.css";

export default function Login() {
  return (
    <>
      <Form method="POST" className={styles.loginForm}>
        <legend className={styles.loginTitle}>Admin Login</legend>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <button className={button.primaryButton} type="submit">
          Login
        </button>
      </Form>
    </>
  );
}
