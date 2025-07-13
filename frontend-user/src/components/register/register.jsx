import { Form } from "react-router-dom";
import button from "../../assets/styles/button.module.css";
import styles from "./register.module.css";

export default function Register() {
  return (
    <>
      <Form method="POST" className={styles.registerForm}>
        <legend className={styles.registerTitle}>Register</legend>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" autoComplete="true" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input type="password" name="confirm_password" id="confirm_password" />
        <button className={button.primaryButton} type="submit">
          Register
        </button>
      </Form>
    </>
  );
}
