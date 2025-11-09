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
  },
  onAdminLogin = () => {
    console.log('Connexion admin réussie');
  }
}) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  const handleFormationClick = (formationId) => {
    if (onFormationSelect) {
      onFormationSelect(formationId);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Vérification des identifiants
    if (adminCredentials.username === 'tessiern782@gmail.com' && adminCredentials.password === 'Password1') {
      console.log('✅ Connexion admin réussie !');
      setShowAdminLogin(false);
      setAdminCredentials({ username: '', password: '' });
      
      // Appeler le callback parent pour naviguer vers la page admin
      if (onAdminLogin) {
        onAdminLogin();
      }
    } else {
      setLoginError('Identifiants incorrects. Utilisez tessiern782@gmail.com / Password1');
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (loginError) setLoginError('');
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
                onClick={() => {
                  setShowAdminLogin(false);
                  setLoginError('');
                  setAdminCredentials({ username: '', password: '' });
                }}
              >
                ×
              </button>
            </div>
            
            <form className="admin-form" onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  value={adminCredentials.username}
                  onChange={handleAdminInputChange}
                  placeholder="tessiern782@gmail.com"
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
                  placeholder="Password1"
                  required
                />
              </div>

              {loginError && (
                <div className="login-error">
                  {loginError}
                </div>
              )}

              <div className="admin-form-buttons">
                <button type="submit" className="login-button">
                  Se connecter
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setLoginError('');
                    setAdminCredentials({ username: '', password: '' });
                  }}
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