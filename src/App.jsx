import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Barre de navigation
import Home from "../pages/Home"; // Page d'accueil
import ManageCV from "../pages/ManageCV"; // Gestion des CV
import PublicCVList from "../pages/PublicCVList"; // Liste publique des CV
import CVDetailPage from "../pages/CVDetailPage"; // Détails d'un CV
import Login from "../pages/Login"; // Page de connexion
import Register from "../pages/Register"; // Page d'inscription

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre l'authentification
  const [loading, setLoading] = useState(true); // État pour afficher un loader pendant la vérification

  // Vérifie si un token est présent dans le localStorage au chargement
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optionnel : vérifie la validité du token (si le backend encode la date d'expiration)
      const payload = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
      if (payload.exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("authToken"); // Token expiré
      }
    }
    setLoading(false); // Fin du chargement
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Supprime le token
    setIsLoggedIn(false); // Met à jour l'état
  };

  // Affiche un loader pendant la vérification initiale
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} /> {/* Barre de navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-cv" element={isLoggedIn ? <ManageCV /> : <Navigate to="/login" />} />
        <Route path="/public-cvs" element={<PublicCVList />} />
        <Route path="/cv/:id" element={<CVDetailPage />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(true)} />} />
      </Routes>
    </Router>
  );
};

export default App;
