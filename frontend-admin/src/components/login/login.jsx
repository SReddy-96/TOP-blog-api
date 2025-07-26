import { Form, useActionData } from "react-router-dom";
import styles from "./login.module.css";
import button from "../../assets/styles/button.module.css";

export default function Login() {
  const actionData = useActionData();
  return (
    <>
      <Form method="POST" className={styles.loginForm}>
        <legend className={styles.loginTitle}>Admin Login</legend>
        {actionData?.error && (
          <p className={styles.error}>{actionData.error}</p>
        )}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" autoComplete="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" autoComplete="current-password"/>
        <button className={button.primaryButton} type="submit">
          Login
        </button>
      </Form>
    </>
  );
}
