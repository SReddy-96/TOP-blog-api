import styles from "./postCard.module.css";

export default function PostCard({ post }) {
  // Only show a preview of the post
  const previewLength = 100;
  const preview =
    post.post.length > previewLength
      ? post.post.slice(0, previewLength) + "..."
      : post.post;

  return (
    <div className={styles.postCard}>
      <h3 className={styles.postTitle}>{post.title}</h3>
      <hr />
      <p className={styles.postPreview}>{preview}</p>
      <i className={styles.postDate}>
        {new Date(post.created).toLocaleDateString("en-GB")}
      </i>
    </div>
  );
}
