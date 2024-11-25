import React, { useState, useEffect } from "react";

const EspacePersonnel = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Erreur lors du chargement des données utilisateur");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Modifier les informations personnelles
  const handleUpdateProfile = async (modifications) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(modifications),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData); // Met à jour l'état
        alert("Informations mises à jour !");
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Supprimer une recommandation
  const handleDeleteRecommendation = async (recommendationId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/recommendations/${recommendationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Recommandation supprimée !");
        setUserData((prev) => ({
          ...prev,
          recommendations: prev.recommendations.filter(
            (rec) => rec.id !== recommendationId
          ),
        }));
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Espace Personnel</h1>
      {userData ? (
        <div>
          <h2>Vos informations :</h2>
          <p>Prénom : {userData.firstname}</p>
          <p>Nom : {userData.lastname}</p>
          <p>Email : {userData.email}</p>

          <button
            onClick={() =>
              handleUpdateProfile({ firstname: "NouveauPrenom", lastname: "NouveauNom" })
            }
          >
            Modifier mes informations
          </button>

          <h2>Recommandations reçues :</h2>
          {userData.recommendations?.length > 0 ? (
            <ul>
              {userData.recommendations.map((rec) => (
                <li key={rec.id}>
                  {rec.message}
                  <button onClick={() => handleDeleteRecommendation(rec.id)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune recommandation reçue.</p>
          )}
        </div>
      ) : (
        <p>Impossible de charger vos informations.</p>
      )}
    </div>
  );
};

export default EspacePersonnel;
