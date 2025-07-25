import { redirect } from "react-router-dom";

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${params.postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // redirect if not logged in
  if (res.status === 401) {
    return redirect("/");
  }
  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.errors) {
      throw new Error(errorData.errors[0].msg);
    }
    throw new Error("Failed to get post");
  }
  return res.json();
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${params.postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: formData.get("comment") }),
    },
  );
  if (!res.ok) {
    const errorData = await res.json();
    // Handle validation errors from your backend
    if (errorData.errors) {
      throw new Error(errorData.errors[0].msg);
    }
    throw new Error("Failed to comment");
  }
  return res.json();
}

export async function deleteCommentAction({ params }) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${params.postId}/comments/${params.commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) throw new Error("Failed to delete comment");
  return null;
}

export async function editCommentAction({ request, params }) {
  const formData = await request.formData();
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${params.postId}/comments/${params.commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: formData.get("comment") }),
    },
  );
  if (!res.ok) throw new Error("Failed to edit comment");
  return null;
}
