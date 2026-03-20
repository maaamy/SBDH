import { Routes, Route } from 'react-router-dom'
import './App.css'
import PageAccueil from './pages/PageAccueil.jsx'
import PageConnexion from './pages/PageConnexion.jsx'
import PageInscription from './pages/PageInscription.jsx'
function App() {
 
 return (
    <Routes>
      <Route path="/" element={<PageAccueil />}/>
      <Route path="/connexion" element={<PageConnexion />}/>
      <Route path="/inscription" element={<PageInscription />}/>
    </Routes>
  )
}

export default App
