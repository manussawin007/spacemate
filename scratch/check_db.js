const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const jsContent = fs.readFileSync('assets/js/supabase.js', 'utf8');
const urlMatch = jsContent.match(/const\s+SUPABASE_URL\s*=\s*['"]([^'"]+)['"]/);
const keyMatch = jsContent.match(/const\s+SUPABASE_ANON_KEY\s*=\s*['"]([^'"]+)['"]/);

if (urlMatch && keyMatch) {
  const supabase = createClient(urlMatch[1], keyMatch[1]);
  
  async function test() {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, status, payment_slip_url, profiles:user_id(id, display_name)')
      .limit(1);
    
    console.log('Test 1 Error:', error);
    console.log('Test 1 Data:', data);
    
    // Check pending bookings with slip
    const { data: d2, error: e2 } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'pending')
      .not('payment_slip_url', 'is', null);
      
    console.log('Pending bookings count:', d2 ? d2.length : 0);
    console.log('Pending bookings error:', e2);
  }
  
  test();
}
