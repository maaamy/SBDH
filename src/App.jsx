import { Routes, Route } from 'react-router-dom';
import './App.css';
import PageAccueil from './pages/PageAccueil.jsx';
import PageConnexion from './pages/PageConnexion.jsx';
import PageInscription from './pages/PageInscription.jsx';
import PageInscriptionClient from './pages/PageInscriptionClient.jsx';
import PageInscriptionEntreprise from './pages/PageInscriptionEntreprise.jsx';
import PageConnexionClient from "./pages/PageConnexionClient.jsx";
import PageConnexionEntreprise from "./pages/PageConnexionEntreprise.jsx";
import ReinitialisationEmail from './pages/ReinitialisationEmail.jsx'
import ReinitialisationMotDePasse from './pages/ReinitialisationMotDePasse.jsx'
import CatalogueClient from './pages/CatalogueClient.jsx'
import Panier from './pages/Panier.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { verifyToken } from './store/slices/authSlice.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/" element={<PageAccueil />}/>

      <Route path="/connexion" element={<PageConnexion />}/>
      <Route path="/connexion/client" element={<PageConnexionClient />}/>
      <Route path="/connexion/entreprise" element={<PageConnexionEntreprise />}/>

      <Route path="/inscription" element={<PageInscription />}/>
      <Route path="/inscription/client" element={<PageInscriptionClient />}/>
      <Route path="/inscription/entreprise" element={<PageInscriptionEntreprise />}/>

      <Route path="/reinitialisation/email" element={<ReinitialisationEmail />}/>
      <Route path="/reinitialisation/mot-de-passe" element={<ReinitialisationMotDePasse />}/>

      {/* Pages protégées clients */}
      <Route element={<ProtectedRoute allowedTypes={['client']}/>} >
        <Route path="/catalogue" element={<CatalogueClient />}/>
      </Route>

      <Route path="/panier" element={<Panier />}/>
      
    </Routes>
  )
}
export default App;