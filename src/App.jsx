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
import ConfirmationCommande from './pages/ConfirmationCommande.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyToken } from './store/slices/authSlice.js';
import { fetchCustomer, setCartCount, setNotifCount } from './store/slices/customerSlice.js';
import { fetchEnterprise, setNotifCount as setEnterpriseNotifCount } from './store/slices/enterpriseSlice.js';
import ProfilClient from './pages/ProfilClient.jsx';
import DashboardClient from './pages/DashboardClient.jsx';
import HistoriqueCommandes from './pages/HistoriqueCommandes.jsx';
import ProfilEntreprise from './pages/ProfilEntreprise.jsx';
import CatalogueEntreprise from './pages/CatalogueEntreprise.jsx';
import AjoutProduit from './pages/AjoutProduit.jsx';
import DashboardEntreprise from './pages/DashboardEntreprise.jsx';
import AvisClients from './pages/AvisClients.jsx';
import FicheProduit from './pages/FicheProduit.jsx';
import CommandesEntreprise from './pages/CommandesEntreprise.jsx';
import NotificationsClient from './pages/NotificationsClient.jsx';
import NotificationsEntreprise from './pages/NotificationsEntreprise.jsx';
import { fetchAppData } from './store/slices/appDataSlice.js';
import * as customerService from './services/customerService.js';
import * as enterpriseService from './services/enterpriseService.js';

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(verifyToken()).then((result) => {
      const user = result.payload;
      if (user?.type === "client") {
        dispatch(fetchCustomer(user.user_id)).then((res) => {
          const clientId = res.payload?.id;
          const loginId = res.payload?.login_id;
          if (clientId) {
            customerService.fetchCart(clientId).then((cart) => {
              dispatch(setCartCount(cart.reduce((acc, c) => acc + c.quantite, 0)));
            }).catch(() => {});
          }
          if (loginId) {
            customerService.fetchNotifications(loginId).then((notifs) => {
                dispatch(setNotifCount(notifs.filter(n => !n.lu).length));
            }).catch(() => {});
          }
        }).finally(() => setLoading(false));
      } else if (user?.type === "entreprise") {
        dispatch(fetchEnterprise(user.user_id)).then((res) => {
          const loginId = res.payload?.login_id;
            if (loginId) {
                enterpriseService.fetchNotifications(loginId).then((notifs) => {
                    dispatch(setEnterpriseNotifCount(notifs.filter(n => !n.lu).length));
                }).catch(() => {});
            }
        }).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
    dispatch(fetchAppData());
  }, []);

  if(loading) return  <div>Chargement...</div>;

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

      <Route path="/produit/:id" element={<FicheProduit />} />

      {/* Pages protégées clients */}
      <Route element={<ProtectedRoute allowedTypes={['client']}/>} >
        <Route path="/catalogue" element={<CatalogueClient />}/>
        <Route path="/panier" element={<Panier />}/>
        <Route path="/confirmation-commande" element={<ConfirmationCommande />}/>
        <Route path="/profil" element={<ProfilClient />}/>
        <Route path="/tableau-de-bord" element={<DashboardClient />}/>
        <Route path="/commandes" element={<HistoriqueCommandes />}/>    
        <Route path="/notifications" element={<NotificationsClient />}/>
      </Route>

      {/* Pages protégées entreprises */}
      <Route element={<ProtectedRoute allowedTypes={['entreprise']}/>} >
        <Route path="/profil-entreprise" element={<ProfilEntreprise/>}/>
        <Route path="/ajout-produit" element={<AjoutProduit />}/>
        <Route path="/catalogue-entreprise" element={<CatalogueEntreprise />}/>
        <Route path="/tableau-de-bord-entreprise" element={<DashboardEntreprise />}/>
        <Route path="/avis-clients" element={<AvisClients />} />
        <Route path="/commandes-entreprise" element={<CommandesEntreprise />} />
        <Route path="/notifications-entreprise" element={<NotificationsEntreprise />} />
      </Route>

    </Routes>
  );
}
export default App;