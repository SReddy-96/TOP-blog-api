import { Form } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Form method="POST">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </Form>
    </>
  );
}
