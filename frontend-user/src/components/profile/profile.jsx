import { useLoaderData, useFetcher } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export default function Profile() {
  const { user } = useLoaderData();
  const fetcher = useFetcher();

  const [editUsername, setEditUsername] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const currentId = jwtDecode(token).id;

  return (
    <>
      <span>{fetcher.state === "submitting" ? "Editing..." : ""}</span>
      {editingId === user.id ? (
        <fetcher.Form
          method="PUT"
          action={"edit"}
          onSubmit={() => setEditingId(null)}
        >
          <input
            type="text"
            name="username"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            required
            autoComplete="true"
          ></input>
          <button type="submit" disabled={editUsername === user.username}>
            Save
          </button>
          <button type="button" onClick={() => setEditingId(null)}>
            Cancel
          </button>
        </fetcher.Form>
      ) : (
        <>
          <p>Username: {user.username}</p>
          <p>Created: {new Date(user.created).toDateString()}</p>
          <p>Updated: {new Date(user.updated).toDateString()}</p>
          <p>Amount of Comments: {user.comments.length}</p>
        </>
      )}
      {currentId === user.id ? (
        <>
          <button
            onClick={() => {
              setEditingId(user.id);
              setEditUsername(user.username);
            }}
          >
            Edit
          </button>
          <fetcher.Form method="DELETE" action={"delete"}>
            <button type="submit">Delete</button>
          </fetcher.Form>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
