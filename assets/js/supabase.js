// assets/js/supabase.js
// Supabase Configuration and Initialization

const supabaseUrl = 'https://dttvbzrobyefehtrddtr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dHZienJvYnllZmVodHJkZHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTg3NDgsImV4cCI6MjEwMzQ3NDc0OH0.vUXBhrCmspD_HNHyVLQ8CZ22PxcjI6IQ_LZlQ100cJQ';

// Initialize the Supabase client EXACTLY ONCE here
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Utility function to get current user session
async function getSession() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    return session;
}
