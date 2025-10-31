import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



// import ConfirmationPage from './components/ConfirmationPage'

// function App() {
//   return <ConfirmationPage reservationId="ABC12345" />
// }

// export default App



// App.jsx
// import React from 'react';
// import DescriptionFormation from './components/DescriptionFormation';

// // Importez directement les images
// import image1 from './assets/images/Page_Test/image1.jpg';
// import image2 from './assets/images/Page_Test/image2.jpg';
// import image3 from './assets/images/Page_Test/image3.jpg';
// import image4 from './assets/images/Page_Test/image4.jpg';

// function App() {
//   const images = [image1, image2, image3, image4];

//   return (
//     <div className="App">
//       <DescriptionFormation 
//         titreEvenement="Formation React Avancé - Les Hooks et Au-delà"
//         descriptionEvenement="Plongez au cœur de React avec cette formation intensive qui couvre les hooks avancés, la gestion d'état complexe, les performances et les meilleures pratiques. Vous apprendrez à créer des applications React robustes, maintenables et performantes."
//         heureEvenement="14:00 - 17:00"
//         jourSemaine={1} // Mardi
//         images={images} // Passez directement le tableau d'images
//       />
//     </div>
//   );
// }

// export default App;



// // App.jsx
// import React from 'react';
// import AccueilFormations from './components/AccueilFormations';
// import DescriptionFormation from './components/DescriptionFormation';
// import './App.css';

// // Importez vos images
// import reactImage1 from './assets/images/react/react1.webp';
// import reactImage2 from './assets/images/react/react2.png';
// import jsImage1 from './assets/images/js/js1.png';
// import jsImage2 from './assets/images/js/js2.png';
// import nodeImage1 from './assets/images/nodejs/nodejs1.png';
// import nodeImage2 from './assets/images/nodejs/nodejs2.png';

// function App() {
//   const formations = {
//     "formation-react": {
//       titre: "Formation React Avancé",
//       images: [reactImage1, reactImage2],
//       description: "Maîtrisez les concepts avancés de React avec cette formation complète...",
//       heure: "14:00 - 17:00",
//       jour: 1 // Mardi
//     },
//     "formation-js": {
//       titre: "Formation JavaScript Moderne",
//       images: [jsImage1, jsImage2],
//       description: "Découvrez les dernières fonctionnalités de JavaScript moderne...",
//       heure: "10:00 - 13:00", 
//       jour: 3 // Jeudi
//     },
//     "formation-node": {
//       titre: "Formation Node.js & Express",
//       images: [nodeImage1, nodeImage2],
//       description: "Apprenez à créer des applications backend robustes avec Node.js...",
//       heure: "09:00 - 12:00",
//       jour: 5 // Samedi
//     }
//   };

//   const [formationSelectionnee, setFormationSelectionnee] = React.useState(null);

//   const handleFormationSelect = (formationId) => {
//     setFormationSelectionnee(formationId);
//   };

//   const handleRetourAccueil = () => {
//     setFormationSelectionnee(null);
//   };

//   if (formationSelectionnee) {
//     const formation = formations[formationSelectionnee];
//     return (
//       <DescriptionFormation
//         titreEvenement={formation.titre}
//         descriptionEvenement={formation.description}
//         heureEvenement={formation.heure}
//         jourSemaine={formation.jour}
//         images={formation.images}
//         onRetour={handleRetourAccueil} // PASSER LA FONCTION DE RETOUR
//       />
//     );
//   }

//   return (
//     <div className="App">
//       <AccueilFormations 
//         formations={formations}
//         onFormationSelect={handleFormationSelect}
//       />
//     </div>
//   );
// }

// export default App;




// App.jsx
import React from 'react';
import PageAdministrateur from './components/PageAdministrateur';
import './App.css';

function App() {
  // Données de test pour l'admin
  const formationsAdmin = [
    {
      id: "formation-react",
      nom: "Formation React Avancé",
      date: "2024-02-15",
      heureDebut: "14:00",
      inscrits: 28
    },
    {
      id: "formation-js",
      nom: "Formation JavaScript Moderne", 
      date: "2024-02-20",
      heureDebut: "10:00",
      inscrits: 15
    },
    {
      id: "formation-node",
      nom: "Formation Node.js & Express",
      date: "2024-02-10", 
      heureDebut: "09:00",
      inscrits: 30
    },
    {
      id: "formation-angular",
      nom: "Formation Angular",
      date: "2024-02-25",
      heureDebut: "16:00", 
      inscrits: 12
    },
    {
      id: "formation-vue",
      nom: "Formation Vue.js",
      date: "2024-02-18",
      heureDebut: "13:00",
      inscrits: 25
    },
    {
      id: "formation-python",
      nom: "Formation Python Django",
      date: "2024-02-22",
      heureDebut: "11:00",
      inscrits: 30
    }
  ];

  const handleRetourAccueil = () => {
    console.log('Retour à l\'accueil');
    // Pour l'instant, on reste sur la page admin
    alert('Fonctionnalité de retour à implémenter');
  };

  return (
    <PageAdministrateur 
      formations={formationsAdmin}
      onRetourAccueil={handleRetourAccueil}
    />
  );
}

export default App;








