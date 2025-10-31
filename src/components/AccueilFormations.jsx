// AccueilFormations.jsx
import React, { useState } from 'react';
import './AccueilFormations.css';

const AccueilFormations = ({
  formations = {
    "formation-1": {
      titre: "Formation React Avancé",
      images: ["/images/react1.jpg", "/images/react2.jpg"]
    },
    "formation-2": {
      titre: "Formation JavaScript Moderne", 
      images: ["/images/js1.jpg", "/images/js2.jpg"]
    },
    "formation-3": {
      titre: "Formation Node.js & Express",
      images: ["/images/node1.jpg", "/images/node2.jpg"]
    }
  },
  onFormationSelect = (formationId) => {
    console.log('Formation sélectionnée:', formationId);
  }
}) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });

  const handleFormationClick = (formationId) => {
    if (onFormationSelect) {
      onFormationSelect(formationId);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Simulation de connexion admin
    console.log('Tentative de connexion admin:', adminCredentials);
    if (adminCredentials.username && adminCredentials.password) {
      alert('Connexion administrateur réussie !');
      setShowAdminLogin(false);
      setAdminCredentials({ username: '', password: '' });
    } else {
      alert('Veuillez entrer un nom d\'utilisateur et un mot de passe');
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="accueil-container">
      {/* Header avec bouton admin */}
      <header className="accueil-header">
        <div className="header-content">
          <h1 className="accueil-title">Formations en Ligne</h1>
          <button 
            className="admin-button"
            onClick={() => setShowAdminLogin(true)}
          >
            🔒 Administrateur
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="accueil-main">
        <div className="formations-grid">
          {Object.entries(formations).map(([formationId, formation]) => (
            <div 
              key={formationId}
              className="formation-card"
              onClick={() => handleFormationClick(formationId)}
            >
              <div className="formation-image-container">
                <img 
                  src={formation.images[0]} 
                  alt={formation.titre}
                  className="formation-image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200/667eea/ffffff?text=${encodeURIComponent(formation.titre)}`;
                  }}
                />
              </div>
              <div className="formation-info">
                <h3 className="formation-titre">{formation.titre}</h3>
                <div className="formation-overlay">
                  <span className="voir-details">Voir les détails →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {Object.keys(formations).length === 0 && (
          <div className="no-formations">
            <p>Aucune formation disponible pour le moment.</p>
          </div>
        )}
      </main>

      {/* Modal de connexion admin */}
      {showAdminLogin && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Connexion Administrateur</h2>
              <button 
                className="close-button"
                onClick={() => setShowAdminLogin(false)}
              >
                ×
              </button>
            </div>
            
            <form className="admin-form" onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={adminCredentials.username}
                  onChange={handleAdminInputChange}
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={adminCredentials.password}
                  onChange={handleAdminInputChange}
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>

              <div className="admin-form-buttons">
                <button type="submit" className="login-button">
                  Se connecter
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAdminLogin(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccueilFormations;