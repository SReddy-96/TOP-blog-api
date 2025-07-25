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
      }),
    });

    if (response.ok) {
      // Handle success - redirect or show success message
      console.log("Post created successfully!");
      return redirect("/");
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
