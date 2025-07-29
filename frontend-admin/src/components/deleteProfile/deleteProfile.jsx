import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import styles from "./deleteProfile.module.css";
import button from "../../assets/styles/button.module.css";

export default function DeleteProfile() {
  const { userId } = useParams();
  const { user } = useLoaderData();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.deleteTitle}>
        Are you sure you want to delete <i>{user.username}</i> permanently?
      </h2>
      <div className={styles.actionButtons}>
        <Link to={`/users/${userId}`} className={button.secondaryButton}>
          Cancel
        </Link>
        <Form method="DELETE">
          <input type="hidden" name="userId" value={userId} />
          <button type="submit" className={button.dangerButton}>
            Delete User
          </button>
        </Form>
      </div>
    </div>
  );
}
