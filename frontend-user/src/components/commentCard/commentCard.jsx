import styles from "./commentCard.module.css";
import { Link, useFetcher } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function CommentCard({ comment }) {
  const Fetcher = useFetcher();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

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
          <textarea
            name="comment"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            required
          />
          <div className={styles.commentButtons}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingId(null)}>
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
                onClick={() => {
                  setEditingId(comment.id);
                  setEditValue(comment.comment);
                }}
              >
                Edit
              </button>
              <Fetcher.Form method="DELETE" action={`comments/${comment.id}`}>
                <button type="submit">Delete</button>
              </Fetcher.Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
