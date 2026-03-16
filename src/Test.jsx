import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function Test() {
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

export default Test
