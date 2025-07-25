import { useLoaderData, useFetcher } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import styles from "./profile.module.css";
import button from "../../assets/styles/button.module.css";

export default function Profile() {
  const { user } = useLoaderData();
  const fetcher = useFetcher();

  const [editUsername, setEditUsername] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const currentId = jwtDecode(token).id;

  return (
    <div className={styles.profileWrapper}>
      <h2 className={styles.profileTitle}>Profile</h2>
      <span>{fetcher.state === "submitting" ? "Editing..." : ""}</span>
      {editingId === user.id ? (
        <fetcher.Form
          method="PUT"
          action={"edit"}
          className={styles.editForm}
          onSubmit={() => setEditingId(null)}
        >
          <label htmlFor="username">Edit Username: </label>
          <input
            type="text"
            name="username"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            required
            autoComplete="true"
          ></input>
          <div className={styles.editFormButtons}>
            <button
              className={button.primaryButton}
              type="submit"
              disabled={editUsername === user.username}
            >
              Save
            </button>
            <button
              className={button.dangerButton}
              type="button"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </fetcher.Form>
      ) : (
        <>
          <div className={styles.profileData}>
            <p>
              <span className={styles.profileHeaders}>Username:</span>
              {user.username}
            </p>
            <p>
              <span className={styles.profileHeaders}>Created:</span>
              {new Date(user.created).toDateString()}
            </p>
            <p>
              <span className={styles.profileHeaders}>Last Updated:</span>
              {new Date(user.updated).toDateString()}
            </p>
            <p>
              <span className={styles.profileHeaders}>Amount of Comments:</span>
              {user.comments.length}
            </p>
          </div>
          {currentId === user.id ? (
            <div className={styles.profileButtons}>
              <button
                className={button.secondaryButton}
                onClick={() => {
                  setEditingId(user.id);
                  setEditUsername(user.username);
                }}
              >
                Edit
              </button>
              <fetcher.Form method="DELETE" action={"delete"}>
                <button className={button.dangerButton} type="submit">
                  Delete
                </button>
              </fetcher.Form>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
