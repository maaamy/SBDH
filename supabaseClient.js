import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xftwsavjfxgdwmpuyrnd.supabase.co'
const supabaseKey = 'sb_publishable_SPYMmDleHayDLJaMtwDY5A_qytyWdrO'

export const supabase = createClient(supabaseUrl, supabaseKey)