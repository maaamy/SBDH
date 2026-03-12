import { supabase } from './supabaseClient'

async function getData() {
  const { data, error } = await supabase
    .from('Categorie')
    .select('*')

  console.log(data)
  console.log(error)
}

testConnection()