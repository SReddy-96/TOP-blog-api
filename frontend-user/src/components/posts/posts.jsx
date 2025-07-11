import { useLoaderData, Link } from "react-router-dom";
import styles from "./posts.module.css";
import PostCard from "../postCard/postCard";

export default function Posts() {
  const { allPosts } = useLoaderData();
  return (
    <div>
      <h2 className={styles.postsTitle}>All Posts</h2>
      <div className={styles.postsWrapper}>
        {allPosts.map((post) => (
          <Link to={String(post.id)} key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
