import { Routes, Route } from 'react-router-dom'
import './App.css'
import PageAccueil from './pages/PageAccueil.jsx'
import PageConnexion from './pages/PageConnexion.jsx'
import PageInscription from './pages/PageInscription.jsx'
import PageInscriptionClient from './pages/PageInscriptionClient.jsx'
import PageInscriptionEntreprise from './pages/PageInscriptionEntreprise.jsx'
import PageConnexionClient from "./pages/PageConnexionClient.jsx";
import PageConnexionEntreprise from "./pages/PageConnexionEntreprise.jsx";
import ReinitialisationEmail from './pages/ReinitialisationEmail.jsx'
import ReinitialisationMotDePasse from './pages/ReinitialisationMotDePasse.jsx'
import CatalogueClient from './pages/CatalogueClient.jsx'
import Panier from './pages/Panier.jsx'
import ConfirmationCommande from './pages/ConfirmationCommande.jsx'


function App() {

 return (
    <Routes>
      <Route path="/" element={<PageAccueil />}/>

      <Route path="/connexion" element={<PageConnexion />}/>
      <Route path="/connexion/client" element={<PageConnexionClient />}/>
      <Route path="/connexion/entreprise" element={<PageConnexionEntreprise />}/>

      <Route path="/inscription" element={<PageInscription />}/>
      <Route path="/inscription/client" element={<PageInscriptionClient />}/>
      <Route path="/inscription/entreprise" element={<PageInscriptionEntreprise />}/>

      <Route path="/reinitialisation/email" element={<ReinitialisationEmail />}/>
      <Route path="/reinitialisation/mot-de-passe" element={<ReinitialisationMotDePasse />}/>
      
      <Route path="/catalogue" element={<CatalogueClient />}/>

      <Route path="/panier" element={<Panier />}/>
      <Route path="/confirmation-commande" element={<ConfirmationCommande />}/>
    </Routes>
  )
}
export default App;