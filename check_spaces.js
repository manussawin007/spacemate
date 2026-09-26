const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://dttvbzrobyefehtrddtr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dHZienJvYnllZmVodHJkZHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTg3NDgsImV4cCI6MjEwMzQ3NDc0OH0.vUXBhrCmspD_HNHyVLQ8CZ22PxcjI6IQ_LZlQ100cJQ');
async function main() {
    const { data, error } = await supabase.from('spaces').select('*').limit(1);
    console.log(data ? Object.keys(data[0] || {}) : error);
}
main();
