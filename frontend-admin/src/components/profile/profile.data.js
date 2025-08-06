import { redirect } from "react-router-dom";

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${params.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // redirect if not logged in
  if (res.status === 401) {
    return redirect("/");
  }
  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.errors) {
      throw new Error(errorData.errors[0].msg);
    }
    throw new Error("Failed to get profile");
  }

  return res.json();
}

export async function deleteUserAction({ params }) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${params.userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete user");
  localStorage.removeItem("token");
  return null;
}

export async function editUserAction({ request, params }) {
  const formData = await request.formData();
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${params.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username: formData.get("username"),
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    return {
      error: errorData.errors ? errorData.errors[0].msg : "Failed to edit user",
    };
  }
  return null;
}
