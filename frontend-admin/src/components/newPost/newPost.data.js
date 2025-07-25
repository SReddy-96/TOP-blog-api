import { redirect } from "react-router-dom";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: formData.get("title"),
        post: formData.get("content"),
        published: formData.get("published") === "on", // Convert checkbox value to boolean
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.errors
          ? errorData.errors[0].msg
          : "Failed to create post",
      };
    }

    // Handle success - redirect or show success message
    return redirect("/");
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
