import { Link, useLoaderData } from "react-router-dom";
import PostCard from "../postCard/postCard";
import Button from "../../assets/styles/button.module.css";
import Styles from "./index.module.css";

export default function Index() {
  const { allPosts } = useLoaderData();
  return (
    <>
      <h2 className={Styles.indexTitle}>Posts</h2>
      {allPosts ? (
        <div className={Styles.postsWrapper}>
          {allPosts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <>
          <p>No posts available</p>
          <Link to="/newPost" className={Button.secondaryButton}>
            Create New Post
          </Link>
        </>
      )}
    </>
  );
}
