import { redirect } from "react-router-dom";

export async function loader({ params }) {
  const { userId } = params;
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/${formData.get("userId")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.ok) {
      localStorage.removeItem("token");
      console.log("User Deleted successfully!");
      return redirect("/login");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
