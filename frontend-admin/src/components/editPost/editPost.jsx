import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, useParams, useLoaderData } from "react-router-dom";
import styles from "./editPost.module.css";
import button from "../../assets/styles/button.module.css";

export default function EditPost() {
  const { postId } = useParams();
  const { post } = useLoaderData();
  const [content, setContent] = useState(post.post);
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Edit Post</h2>
      <Form method="POST" className={styles.form}>
        <div>
          <input type="hidden" name="postId" value={postId} />
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <Editor
            id="content"
            name="content"
            apiKey={import.meta.env.VITE_TINYMCEKEY}
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <label htmlFor="published" className={styles.checkboxWrapper}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id="published"
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish
        </label>
        <input type="hidden" name="content" value={content} />
        <div className={styles.buttonWrapper}>
          <button type="submit" className={button.primaryButton}>
            Edit Post
          </button>
        </div>
      </Form>
    </div>
  );
}
