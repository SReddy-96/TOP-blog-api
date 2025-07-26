import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./nav.module.css";
import button from "../../assets/styles/button.module.css";
import { useState, useEffect } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [width, setWidth] = useState(window.innerWidth);
  let userId;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

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

  return token ? (
    <nav className={styles.nav}>
      <NavLink to={"/"} className={styles.navTitle}>
        {width < 800 ? "📰" : "Blog-API Admin Dashboard"}
      </NavLink>
      <>
        <NavLink to={"newPost"} className={styles.navLink}>
          {width < 800 ? "➕" : "+ New Post"}
        </NavLink>
        <NavLink to={`users/${userId}`} className={styles.navLink}>
          {width < 800 ? "👤" : "Profile"}
        </NavLink>
        <button onClick={handleLogout} className={button.secondaryButton}>
          Logout
        </button>
      </>
    </nav>
  ) : null;
}
