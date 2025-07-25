import { useEffect, useState } from "react";
import { useLoaderData, Link, useFetcher } from "react-router-dom";
import styles from "./post.module.css";
import button from "../../assets/styles/button.module.css";
import CommentCard from "../commentCard/commentCard";

export default function Post() {
  const { post } = useLoaderData();
  const fetcher = useFetcher();

  const [comment, setComment] = useState("");

  // reset text area
  useEffect(() => {
    if (fetcher.state === "idle") {
      setComment("");
    }
  }, [fetcher.state]);

  return (
    <div className={styles.adminPostWrapper}>
      <div className={styles.adminActions}>
        <p className={styles.adminPostTitle}>Preview Post</p>
        <div className={styles.adminActionButtons}>
          <Link to={`/posts/${post.id}/edit`} className={button.primaryButton}>
            Edit Post
          </Link>
          <Link to={`/posts/${post.id}/delete`} className={button.dangerButton}>
            Delete Post
          </Link>
        </div>
      </div>
      <div className={styles.post}>
        <h2 className={styles.postTitle}>{post.title}</h2>
        <div
          className={styles.postText}
          dangerouslySetInnerHTML={{ __html: post.post }}
        ></div>
        <h3 className={styles.commentTitle}>Comments</h3>
        <hr className={styles.line} />
        <div className={styles.commentWrapper}>
          {post.comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
        <fetcher.Form method="post" className={styles.commentForm}>
          <label htmlFor="comment">Comment: </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button className={button.primaryButton} type="submit">
            Add Comment
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
