import { useLoaderData, Form } from "react-router-dom";

export default function Post() {
  const { post } = useLoaderData();
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.post}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments?.map((c) => (
          <li key={c.id}>{c.comment}</li>
        ))}
      </ul>
      <Form method="post">
        <textarea name="comment" required />
        <button type="submit">Add Comment</button>
      </Form>
    </div>
  );
}
