import { Form } from "react-router-dom";

export default function Register() {
  return (
    <>
      <Form method="POST">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" autoComplete="true" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input type="password" name="confirm_password" id="confirm_password" />
        <button type="submit">Register</button>
      </Form>
    </>
  );
}
