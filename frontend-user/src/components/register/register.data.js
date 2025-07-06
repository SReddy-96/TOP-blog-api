import { redirect } from "react-router-dom";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const res = await fetch("http://localhost:3000/register", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
      }),
    });
    console.log(res)
    if (!res.ok) {
      const errorData = await res.json();
      // Handle validation errors from your backend
      if (errorData.errors) {
        throw new Error(errorData.errors[0].msg);
      }
      throw new Error("Failed to Register");
    }

    // Get the actual JSON data from the response
    const data = await res.json();

    // Store the token (assuming your backend returns { token: "..." })
    localStorage.setItem("token", data.token);

    // Return the data or redirect
    return redirect("/");
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}
