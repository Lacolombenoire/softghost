// src/App.jsx
import React, { useState, useEffect } from 'react';
import AccueilFormations from './components/AccueilFormations';
import './App.css';

function App() {
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
            images: formation.chemins_images.map(img => `http://localhost:3000/images/${img}`)
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
            images: ["https://via.placeholder.com/300x200/667eea/ffffff?text=Formation+Test"]
          }
        });
      }
    };

    fetchFormations();
  }, []);

  return (
    <AccueilFormations 
      formations={formations}
      onFormationSelect={(formationId) => {
        console.log('Formation sélectionnée:', formationId);
      }}
    />
  );
}

export default App;