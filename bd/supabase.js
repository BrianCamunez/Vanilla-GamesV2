import { createClient } from '@supabase/supabase-js'
//Creando la conexión con supabase
const supabaseUrl = 'https://ovicmhjwqmnuhwgtzynb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aWNtaGp3cW1udWh3Z3R6eW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTEyNjUsImV4cCI6MjA2NTE2NzI2NX0.dVEXH5J7u-e7sfFiVSL_DdC38emNiB0OXI3wA603NDM'

//exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
