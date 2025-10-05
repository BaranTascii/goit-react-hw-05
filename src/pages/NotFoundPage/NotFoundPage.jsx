import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <main className={styles.main}>
      <h2>Page not found</h2>
      <p>The page you requested doesn"t exist.</p>
      <Link to="/">Go home</Link>
    </main>
  );
}

export default NotFoundPage;
