import { redirect } from "react-router-dom";

export async function loader({ params }) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/users/${params.userId}`, {
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
