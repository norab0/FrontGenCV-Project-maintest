import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Générateur de CV</h1>
      <ul style={styles.navList}>
        <li>
          <Link to="/" style={styles.link}>Accueil</Link>
        </li>
        <li>
          <Link to="/manage-cv" style={styles.link}>Gérer mes CV</Link>
        </li>
        <li>
          <Link to="/public-cvs" style={styles.link}>Voir les CV visibles</Link>
        </li>
        <li>
          <Link to="/login" style={styles.link}>Se connecter</Link>
        </li>
        <li>
          <Link to="/register" style={styles.link}>Se registrer</Link>
        </li>
      </ul>
    </nav>
  );
};

// Styles simples pour la barre de navigation
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  title: {
    fontSize: "20px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default Navbar;
