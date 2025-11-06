// src/App.jsx
import React, { useState, useEffect } from 'react';
import AccueilFormations from './components/AccueilFormations';
import DescriptionFormation from './components/DescriptionFormation';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil'); // 'accueil' ou 'description'
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [formations, setFormations] = useState({});

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
        
        // Transformer le tableau en objet avec le format attendu par AccueilFormations
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
        
        console.log('📊 Formations formatées:', formationsFormatees);
        setFormations(formationsFormatees);
        
      } catch (error) {
        console.error('❌ Erreur chargement formations:', error);
        // En cas d'erreur, utiliser des données de test
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

  const handleRetourAccueil = () => {
    setCurrentPage('accueil');
    setSelectedFormation(null);
  };

  // Afficher la page de description si une formation est sélectionnée
  if (currentPage === 'description' && selectedFormation && formations[selectedFormation]) {
    const formation = formations[selectedFormation];
    return (
      <DescriptionFormation 
        titreEvenement={formation.titre}
        descriptionEvenement={formation.description}
        heureEvenement={`${formation.heure_debut?.substring(0, 5)} - ${formation.heure_fin?.substring(0, 5)}`}
        jourSemaine={formation.jour_semaine}
        images={formation.images}
        formationId={selectedFormation} // ✅ AJOUT: Passer l'ID de la formation
        onRetour={handleRetourAccueil}
      />
    );
  }

  // Sinon afficher la page d'accueil
  return (
    <AccueilFormations 
      formations={formations}
      onFormationSelect={handleFormationSelect}
    />
  );
}

export default App;