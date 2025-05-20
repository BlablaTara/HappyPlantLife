import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY

const supabaseUrl = 'https://kpjwfgukvwxfwkxqjaji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwandmZ3Vrdnd4ZndreHFqYWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NDUwMDQsImV4cCI6MjA2MzMyMTAwNH0.qXHsYOuB5M7h_etDFVzbSxf4DmtSob2Fc-eUJKkVvT4'

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


