process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { createClient } = require('@supabase/supabase-js');

const url = 'https://sxrasjyjvjngqvrqkjnk.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cmFzanlqdmpuZ3F2cnFram5rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk0MTQ2NCwiZXhwIjoyMDc5NTE3NDY0fQ.FALC5rHTZ_pmMACK4crJrm_gRFZxkum_HcU1kXCea8Y';

const supabase = createClient(url, serviceRoleKey);

async function check() {
    console.log("--- Profiles ---");
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
    if (pError) console.error("Profiles Error:", pError);
    else console.log(JSON.stringify(profiles, null, 2));

    console.log("\n--- Auth Users ---");
    const { data: { users }, error: uError } = await supabase.auth.admin.listUsers();
    if (uError) console.error("Users Error:", uError);
    else {
        users.forEach(u => {
            console.log(`User: ${u.email}`);
            console.log(`Metadata:`, u.user_metadata);
            console.log('---');
        });
    }
}

check();
