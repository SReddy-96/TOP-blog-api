import { Link, useLoaderData } from "react-router-dom";
import PostCard from "../postCard/postCard";
import Button from "../../assets/styles/button.module.css";
import Styles from "./index.module.css";

export default function Index() {
  const { allPosts } = useLoaderData();

  // Separate published and draft posts
  const publishedPosts = allPosts
    ? allPosts
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    : [];
  const draftPosts = allPosts
    ? allPosts
        .filter((post) => !post.published)
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    : [];

  return (
    <>
      <h2 className={Styles.indexTitle}>All Posts</h2>

      <h3 className={Styles.indexSubTitle}>Drafts</h3>
      {draftPosts.length > 0 ? (
        <div className={Styles.postsWrapper}>
          {draftPosts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No drafts available</p>
      )}

      <h3 className={Styles.indexSubTitle}>Published Posts</h3>
      {publishedPosts.length > 0 ? (
        <div className={Styles.postsWrapper}>
          {publishedPosts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No published posts available</p>
      )}
    </>
  );
}
