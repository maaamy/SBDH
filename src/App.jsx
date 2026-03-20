import { Routes, Route } from 'react-router-dom'
import './App.css'
import PageAccueil from './pages/PageAccueil.jsx'
import PageConnexion from './pages/PageConnexion.jsx'
import PageInscription from './pages/PageInscription.jsx'
import PageInscriptionClient from './pages/PageInscriptionClient.jsx'
import PageInscriptionEntreprise from './pages/PageInscriptionEntreprise.jsx'
import ConnexionClient from "./pages/ConnexionClient";
import ConnexionEntreprise from "./pages/ConnexionEntreprise";

function App() {

 return (
    <Routes>
      <Route path="/" element={<PageAccueil />}/>
      <Route path="/connexion" element={<PageConnexion />}/>
      <Route path="/connexion/client" element={<ConnexionClient />}/>
      <Route path="/connexion/entreprise" element={<ConnexionEntreprise />}/>
      <Route path="/inscription" element={<PageInscription />}/>
      <Route path="/inscription/client" element={<PageInscriptionClient />}/>
      <Route path="/inscription/entreprise" element={<PageInscriptionEntreprise />}/>
    </Routes>
  )
}
export default App;