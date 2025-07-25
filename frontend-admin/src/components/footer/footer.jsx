import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            About
          </a>
          <a href="#" className={styles.link}>
            Contact
          </a>
          <a href="#" className={styles.link}>
            Privacy
          </a>
          <a href="#" className={styles.link}>
            Terms
          </a>
        </div>
        <p className={styles.copyright}>
          © {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
