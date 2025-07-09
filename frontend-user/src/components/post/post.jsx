import { useEffect, useState } from "react";
import { useLoaderData, Form, Link, useFetcher } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./post.module.css";

export default function Post() {
  const { post } = useLoaderData();
  const fetcher = useFetcher();

  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const token = localStorage.getItem("token");
  const currentId = jwtDecode(token).id;

  // reset text area
  useEffect(() => {
    if (fetcher.state === "idle") {
      setComment("");
    }
  }, [fetcher.state]);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.post}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments?.map((c) => (
          <li key={c.id}>
            {editingId === c.id ? (
              <fetcher.Form
                method="post"
                action={`comments/${c.id}/edit`}
                onSubmit={() => setEditingId(null)}
              >
                <textarea
                  name="comment"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </fetcher.Form>
            ) : (
              <>
                {c.comment} -
                <Link to={`/users/${c.user.id}`}>{c.user.username}</Link>
                <br />
                <i className={styles.commentDate}>
                  {new Date(c.created).toLocaleDateString("en-GB")}
                </i>
                {currentId === c.user.id && (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(c.id);
                        setEditValue(c.comment);
                      }}
                    >
                      Edit
                    </button>
                    <fetcher.Form method="DELETE" action={`comments/${c.id}`}>
                      <button type="submit">Delete</button>
                    </fetcher.Form>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <fetcher.Form method="post">
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </fetcher.Form>
    </div>
  );
}
