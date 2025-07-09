import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userId;

  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  } else {
    userId = null;
  }

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
          <NavLink to={`users/${userId}`}>Profile</NavLink>
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
