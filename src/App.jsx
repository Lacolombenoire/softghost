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
import React from 'react';
import DescriptionFormation from './components/DescriptionFormation';

// Importez directement les images
import image1 from './assets/images/Page_Test/image1.jpg';
import image2 from './assets/images/Page_Test/image2.jpg';
import image3 from './assets/images/Page_Test/image3.jpg';
import image4 from './assets/images/Page_Test/image4.jpg';

function App() {
  const images = [image1, image2, image3, image4];

  return (
    <div className="App">
      <DescriptionFormation 
        titreEvenement="Formation React Avancé - Les Hooks et Au-delà"
        descriptionEvenement="Plongez au cœur de React avec cette formation intensive qui couvre les hooks avancés, la gestion d'état complexe, les performances et les meilleures pratiques. Vous apprendrez à créer des applications React robustes, maintenables et performantes."
        heureEvenement="14:00 - 17:00"
        jourSemaine={1} // Mardi
        images={images} // Passez directement le tableau d'images
      />
    </div>
  );
}

export default App;




