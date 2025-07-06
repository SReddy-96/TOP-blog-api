import { useLoaderData, Link } from "react-router-dom";

export default function Posts() {
  const { allPosts } = useLoaderData();
  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {allPosts.map(post => (
          <li key={post.id}>
            <Link to={String(post.id)}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}