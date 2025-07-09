import { useEffect, useState } from "react";
import { useLoaderData, Form, useNavigation } from "react-router-dom";
import styles from "./post.module.css";

export default function Post() {
  const { post } = useLoaderData();
  const [comment, setComment] = useState("");
  const navigation = useNavigation();

  // reset text area
  useEffect(() => {
    if (navigation.state === "idle") {
      setComment("");
    }
  }, [navigation.state]);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.post}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments?.map((c) => (
          <li key={c.id}>
            {c.comment} - {c.user.username} <br />
            <i className={styles.commentDate}>
              {new Date(c.created).toLocaleDateString("en-GB")}
            </i>
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
