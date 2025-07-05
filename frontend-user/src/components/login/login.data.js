export async function action({ request }) {
  try {
    const formData = await request.formData();
    const res = await fetch("http://localhost:3000/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      // Handle validation errors from your backend
      if (errorData.errors) {
        throw new Error(errorData.errors[0].msg);
      }
      throw new Error("Failed to login");
    }

    // Get the actual JSON data from the response
    const data = await res.json();

    // Store the token (assuming your backend returns { token: "..." })
    localStorage.setItem("token", data.token);

    // Return the data or redirect
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
