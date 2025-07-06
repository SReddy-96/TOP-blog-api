import { redirect } from "react-router-dom";

export async function loader() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/posts", {
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
    throw new Error("Failed to load posts");
  }
  const data = await res.json();

  console.log(data);
  return data;
}
