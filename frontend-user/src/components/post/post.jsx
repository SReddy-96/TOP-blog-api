import { useEffect, useState } from "react";
import { useLoaderData, Form, useNavigation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./post.module.css";

export default function Post() {
  const { post } = useLoaderData();
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  const token = localStorage.getItem("token");
  const currentId = jwtDecode(token).id;

  // reset text area
  useEffect(() => {
    if (navigation.state === "idle") {
      setComment("");
    }
  }, [navigation.state]);

  const deleteComment = async (commentId) => {
    const res = await fetch(
      `http://localhost:3000/posts/${post.id}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to Delete comment");
    }
    // need sorting when the comment is deleted it should be updated
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.post}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments?.map((c) => (
          <li key={c.id}>
            {c.comment} -
            <Link to={`/users/${c.user.id}`}>{c.user.username}</Link>
            <br />
            <i className={styles.commentDate}>
              {new Date(c.created).toLocaleDateString("en-GB")}
            </i>
            {currentId === c.user.id && (
              <>
                <Link>Edit</Link>
                <button onClick={() => deleteComment(c.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Form method="post">
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </Form>
    </div>
  );
}
