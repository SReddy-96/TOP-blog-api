import { Outlet } from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/footer";
import styles from "./root.module.css";

export default function Root() {
  return (
    <div className={styles.root}>
      <Nav />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
