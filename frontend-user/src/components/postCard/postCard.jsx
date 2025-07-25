import styles from "./postCard.module.css";

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export default function PostCard({ post }) {
  const previewLength = 100;
  const plainText = stripHtml(post.post);
  const preview =
    plainText.length > previewLength
      ? plainText.slice(0, previewLength) + "..."
      : plainText;

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
