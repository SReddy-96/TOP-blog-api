import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./nav.module.css";
import button from "../../assets/styles/button.module.css";

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
    <nav className={styles.nav}>
      <NavLink to={"/"} className={styles.navTitle}>
        Blog-API
      </NavLink>
      {token ? (
        <>
          <NavLink to={"posts"} className={styles.navLink}>
            Posts
          </NavLink>
          <NavLink to={`users/${userId}`} className={styles.navLink}>
            Profile
          </NavLink>
          <button onClick={handleLogout} className={button.secondaryButton}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to={"login"} className={styles.navLink}>
            Login
          </NavLink>
          <NavLink to={"register"} className={styles.navLink}>
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
}
