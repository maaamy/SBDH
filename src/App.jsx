import { Routes, Route } from 'react-router-dom'
import './App.css'
import PageAccueil from './pages/PageAccueil.jsx'
import PageConnexion from './pages/PageConnexion.jsx'
import PageInscription from './pages/PageInscription.jsx'
import PageInscriptionClient from './pages/PageInscriptionClient.jsx'
import PageInscriptionEntreprise from './pages/PageInscriptionEntreprise.jsx'
function App() {
 
 return (
    <Routes>
      <Route path="/" element={<PageAccueil />}/>
      <Route path="/connexion" element={<PageConnexion />}/>
      <Route path="/inscription" element={<PageInscription />}/>
      <Route path="/inscription/client" element={<PageInscriptionClient />}/>
      <Route path="/inscription/entreprise" element={<PageInscriptionEntreprise />}/>
    </Routes>
  )
}

export default App
