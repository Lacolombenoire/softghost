// PageAdministrateur.jsx
import React, { useState } from 'react';
import './PageAdministrateur.css';

const PageAdministrateur = ({
  formations = [
    {
      id: "formation-1",
      nom: "Formation React Avancé",
      date: "2024-02-15",
      heureDebut: "14:00",
      inscrits: 28
    },
    {
      id: "formation-2", 
      nom: "Formation JavaScript Moderne",
      date: "2024-02-20",
      heureDebut: "10:00",
      inscrits: 15
    },
    {
      id: "formation-3",
      nom: "Formation Node.js & Express",
      date: "2024-02-10",
      heureDebut: "09:00",
      inscrits: 30
    },
    {
      id: "formation-4",
      nom: "Formation TypeScript",
      date: "2024-02-25",
      heureDebut: "16:00",
      inscrits: 22
    }
  ],
  onRetourAccueil = () => {
    console.log('Retour à l\'accueil');
  }
}) => {
  const [filtre, setFiltre] = useState('toutes'); // 'toutes', 'disponibles', 'pleines'

  // Trier les formations par date (du plus récent au plus tard)
  const formationsTriees = [...formations].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filtrer les formations selon le filtre sélectionné
  const formationsFiltrees = formationsTriees.filter(formation => {
    if (filtre === 'pleines') {
      return formation.inscrits >= 30;
    } else if (filtre === 'disponibles') {
      return formation.inscrits < 30;
    }
    return true; // 'toutes'
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
              <div className="stat-label">Formations totales</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {formations.filter(f => f.inscrits >= 30).length}
              </div>
              <div className="stat-label">Formations pleines</div>
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
          <h2>Filtrer les formations</h2>
          <div className="filtres-buttons">
            <button 
              className={`filtre-btn ${filtre === 'toutes' ? 'active' : ''}`}
              onClick={() => setFiltre('toutes')}
            >
              Toutes les formations
            </button>
            <button 
              className={`filtre-btn ${filtre === 'disponibles' ? 'active' : ''}`}
              onClick={() => setFiltre('disponibles')}
            >
              Places disponibles
            </button>
            <button 
              className={`filtre-btn ${filtre === 'pleines' ? 'active' : ''}`}
              onClick={() => setFiltre('pleines')}
            >
              Formations pleines
            </button>
          </div>
        </div>

        {/* Liste des formations */}
        <main className="admin-main">
          <h2>Liste des formations</h2>
          
          {formationsFiltrees.length === 0 ? (
            <div className="no-formations">
              <p>Aucune formation ne correspond aux critères sélectionnés.</p>
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
                        <span className="detail-value">{formation.heureDebut}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">👥 Inscrits :</span>
                        <span className="detail-value">
                          {formation.inscrits} / 30 personnes
                        </span>
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

                    {/* Actions */}
                    <div className="formation-actions">
                      <button className="action-btn details-btn">
                        Voir les détails
                      </button>
                      <button className="action-btn export-btn">
                        Exporter la liste
                      </button>
                    </div>
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