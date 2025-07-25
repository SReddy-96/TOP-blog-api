import styles from "./postCard.module.css";

export default function PostCard({ post }) {
  const commentAmount = post.comments ? post.comments.length : 0;
    return (
    <div className={styles.postCard}>
      <h3 className={styles.postTitle}>{post.title}</h3>
      <p>Comments: {commentAmount}</p>
      <i className={styles.postDate}>
        {new Date(post.updated).toLocaleDateString("en-GB")}
      </i>
    </div>
  );
}
