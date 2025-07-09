import { useLoaderData } from "react-router-dom";

export default function Profile() {
  const { user } = useLoaderData();
  return (
    <>
      <p>Username: {user.username}</p>
      <p>Created: {new Date(user.created).toDateString()}</p>
    </>
  );
}
