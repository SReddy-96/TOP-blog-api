import { useLoaderData, Link } from "react-router-dom";
import styles from "./posts.module.css";
import PostCard from "../postCard/postCard";

export default function Posts() {
  const { allPosts } = useLoaderData();

  const publishedPosts = allPosts
    ? allPosts.filter((post) => post.published)
    : [];

  return (
    <div>
      <h2 className={styles.postsTitle}>All Posts</h2>
      {publishedPosts.length > 0 ? (
        <div className={styles.postsWrapper}>
          {publishedPosts.map((post) => (
            <Link to={String(post.id)} key={post.id}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No published posts available</p>
      )}
    </div>
  );
}
