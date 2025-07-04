export async function loader() {
  const res = await fetch("http://localhost:3000/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}