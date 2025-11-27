process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { createClient } = require('@supabase/supabase-js');

const url = 'https://sxrasjyjvjngqvrqkjnk.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cmFzanlqdmpuZ3F2cnFram5rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk0MTQ2NCwiZXhwIjoyMDc5NTE3NDY0fQ.FALC5rHTZ_pmMACK4crJrm_gRFZxkum_HcU1kXCea8Y';

const supabase = createClient(url, serviceRoleKey);

async function checkOrdersTable() {
    // Get a sample order to see the structure
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .limit(1);

    if (error) {
        console.log("Error:", error.message);
    } else {
        console.log("Sample order structure:");
        console.log(JSON.stringify(data, null, 2));
    }
}

checkOrdersTable();
