import { useLoaderData, useFetcher } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export default function Profile() {
  const { user } = useLoaderData();
  const fetcher = useFetcher();

  const [editValue, setEditValue] = useState({});
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const currentId = jwtDecode(token).id;

  return (
    <>
      {editingId === user.id ? (
        <fetcher.Form
          method="PUT"
          action={"edit"}
          onSubmit={() => setEditingId(null)}
        >
          <input
            type="text"
            name="username"
            value={editValue.username}
            onChange={(e) => setEditValue(e.target.value)}
            required
          ></input>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingId(null)}>
            Cancel
          </button>
        </fetcher.Form>
      ) : (
        <>
          <p>Username: {user.username}</p>
          <p>Created: {new Date(user.created).toDateString()}</p>
        </>
      )}
      {currentId === user.id ? (
        <>
          <button
            onClick={() => {
              setEditingId(user.id);
              setEditValue(user);
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
