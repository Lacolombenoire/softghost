// src/App.jsx
import React, { useState, useEffect } from 'react';
import AccueilFormations from './components/AccueilFormations';
import DescriptionFormation from './components/DescriptionFormation';
import ConfirmationReservation from './components/ConfirmationReservation';
import ErreurReservation from './components/ErreurReservation';
import PageAdministrateur from './components/PageAdministrateur'; // ✅ AJOUT: Import de la page admin
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil'); // 'accueil', 'description', 'confirmation', 'erreur', 'admin'
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [formations, setFormations] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // ✅ AJOUT: État pour vérifier si admin connecté

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        console.log('🔄 Chargement des formations depuis l API...');
        const response = await fetch('http://localhost:3000/api/formations');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Données brutes reçues:', data);
        
        const formationsFormatees = {};
        data.forEach(formation => {
          formationsFormatees[formation.id_formation] = {
            titre: formation.nom,
            images: formation.chemins_images.map(img => `http://localhost:3000/images/${img}`),
            description: formation.description,
            jour_semaine: formation.jour_semaine,
            heure_debut: formation.heure_debut,
            heure_fin: formation.heure_fin
          };
        });
        
        setFormations(formationsFormatees);
        
      } catch (error) {
        console.error('❌ Erreur chargement formations:', error);
        setFormations({
          "formation-test": {
            titre: "Formation Test",
            images: ["https://via.placeholder.com/300x200/667eea/ffffff?text=Formation+Test"],
            description: "Description de test",
            jour_semaine: 1,
            heure_debut: "14:00:00",
            heure_fin: "17:00:00"
          }
        });
      }
    };

    fetchFormations();
  }, []);

  const handleFormationSelect = (formationId) => {
    console.log('Formation sélectionnée:', formationId);
    setSelectedFormation(formationId);
    setCurrentPage('description');
  };

  // ✅ AJOUT: Gestion de la connexion admin
  const handleAdminLogin = () => {
    console.log('🔐 Connexion admin réussie, navigation vers page admin');
    setIsAdmin(true);
    setCurrentPage('admin');
  };

  const handleReservationSuccess = (reservationInfo) => {
    setReservationData(reservationInfo);
    setCurrentPage('confirmation');
  };

  const handleReservationError = (errorInfo) => {
    setReservationData(errorInfo);
    setCurrentPage('erreur');
  };

  const handleRetourAccueil = () => {
    setCurrentPage('accueil');
    setSelectedFormation(null);
    setReservationData(null);
    setIsAdmin(false); // ✅ AJOUT: Déconnecter l'admin quand il retourne à l'accueil
  };

  // ✅ AJOUT: Afficher la page admin si connecté
  if (currentPage === 'admin' && isAdmin) {
    return (
      <PageAdministrateur 
        onRetourAccueil={handleRetourAccueil}
      />
    );
  }

  // Afficher la page de confirmation
  if (currentPage === 'confirmation') {
    return <ConfirmationReservation onRetourAccueil={handleRetourAccueil} />;
  }

  // Afficher la page d'erreur
  if (currentPage === 'erreur') {
    return <ErreurReservation onRetourAccueil={handleRetourAccueil} />;
  }

  // Afficher la page de description
  if (currentPage === 'description' && selectedFormation && formations[selectedFormation]) {
    const formation = formations[selectedFormation];
    return (
      <DescriptionFormation 
        titreEvenement={formation.titre}
        descriptionEvenement={formation.description}
        heureEvenement={`${formation.heure_debut?.substring(0, 5)} - ${formation.heure_fin?.substring(0, 5)}`}
        jourSemaine={formation.jour_semaine}
        images={formation.images}
        formationId={selectedFormation}
        onRetour={handleRetourAccueil}
        onReservationSuccess={handleReservationSuccess}
        onReservationError={handleReservationError}
      />
    );
  }

  // Sinon afficher la page d'accueil
  return (
    <AccueilFormations 
      formations={formations}
      onFormationSelect={handleFormationSelect}
      onAdminLogin={handleAdminLogin} // ✅ AJOUT: Passer le callback pour l'admin
    />
  );
}

export default App;