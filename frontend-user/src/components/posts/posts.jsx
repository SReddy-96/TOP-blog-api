import { useLoaderData, Link, Outlet } from "react-router-dom";

export default function Posts() {
  const { posts } = useLoaderData();
  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={String(post.id)}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}