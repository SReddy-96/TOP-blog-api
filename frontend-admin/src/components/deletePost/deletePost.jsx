import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import styles from "./deletePost.module.css";
import button from "../../assets/styles/button.module.css";

export default function DeletePost() {
  const { postId } = useParams();
  const { post } = useLoaderData();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.deleteTitle}>
        Are you sure you want to delete <i>{post.title}</i> permanently?
      </h2>
      <div className={styles.actionButtons}>
        <Link to={`/posts/${postId}`} className={button.secondaryButton}>
          Cancel
        </Link>
        <Form method="DELETE">
          <input type="hidden" name="postId" value={postId} />
          <button type="submit" className={button.dangerButton}>
            Delete Post
          </button>
        </Form>
      </div>
    </div>
  );
}
