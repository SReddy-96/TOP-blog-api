import styles from "./commentCard.module.css";
import { Link, useFetcher, useActionData } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import button from "../../assets/styles/button.module.css";

export default function CommentCard({ comment }) {
  const Fetcher = useFetcher();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const actionData = useActionData();

  const token = localStorage.getItem("token");
  const currentId = jwtDecode(token).id;

  return (
    <div className={styles.commentCard}>
      {editingId === comment.id ? (
        <Fetcher.Form
          method="post"
          action={`comments/${comment.id}/edit`}
          onSubmit={() => setEditingId(null)}
          className={styles.editCommentForm}
        >
          {actionData && actionData.error && (
            <p className={styles.error}>{actionData.error}</p>
          )}
          <textarea
            name="comment"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            required
          />
          <div className={styles.commentButtons}>
            <button className={button.primaryButton} type="submit">
              Save
            </button>
            <button
              className={button.dangerButton}
              type="button"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </Fetcher.Form>
      ) : (
        <div className={styles.comment}>
          <Link
            to={`/users/${comment.user.id}`}
            className={styles.commentAuthor}
          >
            @{comment.user.username}
          </Link>
          <p>{comment.comment}</p>

          <i className={styles.commentDate}>
            {new Date(comment.created).toLocaleDateString("en-GB")}
          </i>
          {currentId === comment.user.id && (
            <div className={styles.commentButtons}>
              <button
                className={button.secondaryButton}
                onClick={() => {
                  setEditingId(comment.id);
                  setEditValue(comment.comment);
                }}
              >
                Edit
              </button>
              <Fetcher.Form method="DELETE" action={`comments/${comment.id}`}>
                <button className={button.dangerButton} type="submit">
                  Delete
                </button>
              </Fetcher.Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
