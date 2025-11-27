process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sxrasjyjvjngqvrqkjnk.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cmFzanlqdmpuZ3F2cnFram5rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk0MTQ2NCwiZXhwIjoyMDc5NTE3NDY0fQ.FALC5rHTZ_pmMACK4crJrm_gRFZxkum_HcU1kXCea8Y';

const supabase = createClient(url, key);

async function checkTable() {
    const { data, error } = await supabase
        .from('daily_capacity')
        .select('*')
        .limit(1);

    if (error) {
        console.log("Error accessing daily_capacity:", error.message);
        if (error.code === '42P01') { // undefined_table
            console.log("Table daily_capacity does not exist.");
        }
    } else {
        console.log("Table daily_capacity exists.");
    }
}

checkTable();
