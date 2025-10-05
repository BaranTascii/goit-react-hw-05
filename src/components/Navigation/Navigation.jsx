import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          Home
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;