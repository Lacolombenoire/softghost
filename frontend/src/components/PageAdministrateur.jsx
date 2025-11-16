// PageAdministrateur.jsx
import React, { useState, useEffect } from 'react';
import './PageAdministrateur.css';

const PageAdministrateur = ({
  onRetourAccueil = () => {
    console.log('Retour à l\'accueil');
  }
}) => {
  const [filtreStatut, setFiltreStatut] = useState('toutes'); // 'toutes', 'disponibles', 'pleines'
  const [filtreFormation, setFiltreFormation] = useState('toutes'); // 'toutes' ou id_formation spécifique
  const [formations, setFormations] = useState([]);
  const [typesFormation, setTypesFormation] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les vraies données depuis l'API
  useEffect(() => {
    const fetchFormationsAdmin = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/admin/statistiques');
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        
        const data = await response.json();
        console.log('📊 Données admin:', data);
        setFormations(data);
        
        // Extraire les types de formation uniques
        const typesUniques = [...new Set(data.map(item => ({
          id: item.id_formation,
          nom: item.nom
        })))].filter(item => item.id && item.nom);
        
        setTypesFormation(typesUniques);
        console.log('🎯 Types de formation:', typesUniques);
        
      } catch (error) {
        console.error('Erreur chargement données admin:', error);
        setFormations([]);
        setTypesFormation([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFormationsAdmin();
  }, []);

  // Trier les formations par date
  const formationsTriees = [...formations].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filtrer les formations selon les filtres sélectionnés
  const formationsFiltrees = formationsTriees.filter(formation => {
    // Filtre par statut (pleines/disponibles)
    let filtreStatutOk = true;
    if (filtreStatut === 'pleines') {
      filtreStatutOk = formation.inscrits >= 30;
    } else if (filtreStatut === 'disponibles') {
      filtreStatutOk = formation.inscrits < 30;
    }

    // Filtre par type de formation
    let filtreTypeOk = true;
    if (filtreFormation !== 'toutes') {
      filtreTypeOk = formation.id_formation === filtreFormation;
    }

    return filtreStatutOk && filtreTypeOk;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatutFormation = (inscrits) => {
    if (inscrits >= 30) {
      return { texte: 'Formation pleine', classe: 'pleine' };
    } else if (inscrits >= 25) {
      return { texte: 'Presque pleine', classe: 'presque-pleine' };
    } else {
      return { texte: 'Places disponibles', classe: 'disponible' };
    }
  };

  const getPourcentageInscription = (inscrits) => {
    return Math.min((inscrits / 30) * 100, 100);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-admin">
          <p>Chargement des données administrateur...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        {/* Header */}
        <header className="admin-header">
          <div className="header-top">
            <button className="back-button" onClick={onRetourAccueil}>
              ← Retour à l'accueil
            </button>
            <h1 className="admin-title">Espace Administrateur</h1>
          </div>
          
          {/* Statistiques */}
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-number">{formations.length}</div>
              <div className="stat-label">Sessions ce mois</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {formations.filter(f => f.inscrits >= 30).length}
              </div>
              <div className="stat-label">Sessions pleines</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {formations.reduce((total, f) => total + f.inscrits, 0)}
              </div>
              <div className="stat-label">Total inscriptions</div>
            </div>
          </div>
        </header>

        {/* Filtres */}
        <div className="filtres-section">
          <h2>Filtrer les sessions</h2>
          
          {/* Filtre par type de formation */}
          <div className="filtre-groupe">
            <label htmlFor="filtre-formation" className="filtre-label">
              📚 Type de formation :
            </label>
            <select
              id="filtre-formation"
              value={filtreFormation}
              onChange={(e) => setFiltreFormation(e.target.value)}
              className="filtre-select"
            >
              <option value="toutes">Tous les logiciels</option>
              {typesFormation.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre par statut */}
          <div className="filtre-groupe">
            <label className="filtre-label">📊 Statut :</label>
            <div className="filtres-buttons">
              <button 
                className={`filtre-btn ${filtreStatut === 'toutes' ? 'active' : ''}`}
                onClick={() => setFiltreStatut('toutes')}
              >
                Toutes les sessions
              </button>
              <button 
                className={`filtre-btn ${filtreStatut === 'disponibles' ? 'active' : ''}`}
                onClick={() => setFiltreStatut('disponibles')}
              >
                Places disponibles
              </button>
              <button 
                className={`filtre-btn ${filtreStatut === 'pleines' ? 'active' : ''}`}
                onClick={() => setFiltreStatut('pleines')}
              >
                Sessions pleines
              </button>
            </div>
          </div>

          {/* Résumé des filtres */}
          <div className="filtres-resume">
            <p>
              Affichage de <strong>{formationsFiltrees.length}</strong> session(s) 
              {filtreFormation !== 'toutes' && 
                ` pour "${typesFormation.find(t => t.id === filtreFormation)?.nom || filtreFormation}"`
              }
              {filtreStatut !== 'toutes' && 
                ` (${filtreStatut === 'pleines' ? 'pleines' : 'avec places disponibles'})`
              }
            </p>
          </div>
        </div>

        {/* Liste des formations */}
        <main className="admin-main">
          <h2>Sessions du mois prochain</h2>
          
          {formationsFiltrees.length === 0 ? (
            <div className="no-formations">
              <p>Aucune session ne correspond aux critères sélectionnés.</p>
              <button 
                className="reset-filtres-btn"
                onClick={() => {
                  setFiltreStatut('toutes');
                  setFiltreFormation('toutes');
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="formations-list">
              {formationsFiltrees.map((formation) => {
                const statut = getStatutFormation(formation.inscrits);
                const pourcentage = getPourcentageInscription(formation.inscrits);
                
                return (
                  <div key={formation.id} className="formation-admin-card">
                    <div className="formation-header">
                      <h3 className="formation-nom">{formation.nom}</h3>
                      <span className={`statut-badge ${statut.classe}`}>
                        {statut.texte}
                      </span>
                    </div>
                    
                    <div className="formation-details">
                      <div className="detail-item">
                        <span className="detail-label">📅 Date :</span>
                        <span className="detail-value">{formatDate(formation.date)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">⏰ Heure :</span>
                        <span className="detail-value">{formation.heureDebut} - {formation.heureFin}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">👥 Inscrits :</span>
                        <span className="detail-value">
                          {formation.inscrits} / 30 personnes
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">🆔 ID Formation :</span>
                        <span className="detail-value formation-id">{formation.id_formation}</span>
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="progression-section">
                      <div className="progression-bar">
                        <div 
                          className={`progression-remplissage ${statut.classe}`}
                          style={{ width: `${pourcentage}%` }}
                        ></div>
                      </div>
                      <div className="progression-text">
                        {formation.inscrits} inscrits ({Math.round(pourcentage)}%)
                      </div>
                    </div>

                    {/* ✅ SUPPRIMÉ: Section des actions */}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PageAdministrateur;