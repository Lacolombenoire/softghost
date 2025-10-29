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



// App.js (Exemple d'utilisation)
import React from 'react';
import ErreurReservation from './components/ErreurReservation';

function App() {
  return (
    <div className="App">
      <ErreurReservation 
        nomEvenement="Formation React Avancé"
        dateEvenement="20 janvier 2024"
        heureEvenement="09:30"
        email="marie.dubois@entreprise.com"
        messageErreur="Le paiement n'a pas pu être traité. Veuillez vérifier vos informations de paiement et réessayer."
        codeErreur="PAYMENT-402"
      />
    </div>
  );
}

export default App;





