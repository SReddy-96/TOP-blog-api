import { NavLink, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <NavLink to={"posts"}>Posts</NavLink>
          <NavLink to={"profile"}>Profile</NavLink>
        </>
      ) : (
        <>
          <NavLink to={"login"}>Login</NavLink>
          <NavLink to={"register"}>Register</NavLink>
        </>
      )}
    </nav>
  );
}
