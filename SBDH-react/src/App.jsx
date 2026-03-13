import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
  getData()
}, [])

async function getData() {
  console.log("test connexion")

  const { data, error } = await supabase
    .from("Categorie")
    .select("*")
  console.log(data)
  
   if (error) {
      console.log("Erreur Supabase :", error)
    } else {
      console.log("Connexion réussie :", data)
    }

}
 return (
    <div>
      <h1>Test connexion Supabase</h1>
    </div>
  )
  
}

export default App
