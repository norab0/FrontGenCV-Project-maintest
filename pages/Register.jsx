import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5173/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token); // Sauvegarder le token
        onRegister(); // Met à jour l'état global
        navigate("/manage-cv"); // Redirige après inscription
      } else {
        setError(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setError("Une erreur s'est produite.");
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Prénom:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <label>
          Nom:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
