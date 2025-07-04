
export async function loader({ params }) {
  const res = await fetch(`http://localhost:3000/posts/${params.postId}`);
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  return res.json();
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:3000/posts/${params.postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: formData.get("comment") }),
    },
  );
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
}