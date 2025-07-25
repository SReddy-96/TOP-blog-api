import { redirect } from "react-router-dom";

export async function loader({ params }) {
  const { postId } = params;
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    return redirect("/");
  }
  if (!res.ok) {
    const errorData = await res.json();
    // Handle validation errors from your backend
    if (errorData.errors) {
      throw new Error(errorData.errors[0].msg);
    }
    throw new Error("Failed to load post");
  }
  const data = await res.json();

  return data;
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${formData.get("postId")}`, {
      method: "PUT",
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
      console.log("Post edited successfully!");
      return redirect("/");
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
