process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const url = 'https://sxrasjyjvjngqvrqkjnk.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cmFzanlqdmpuZ3F2cnFram5rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk0MTQ2NCwiZXhwIjoyMDc5NTE3NDY0fQ.FALC5rHTZ_pmMACK4crJrm_gRFZxkum_HcU1kXCea8Y';

const supabase = createClient(url, serviceRoleKey);

async function runMigration() {
    const sql = fs.readFileSync('./packages/database/migrations/add_daily_capacity.sql', 'utf8');

    console.log('Running migration: add_daily_capacity.sql');
    console.log('SQL:', sql);

    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
        console.error('Migration failed:', error);

        // Try direct execution via REST API
        console.log('\nTrying direct execution...');
        const response = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
                'apikey': serviceRoleKey,
                'Authorization': `Bearer ${serviceRoleKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql_query: sql })
        });

        const result = await response.text();
        console.log('Response:', result);
    } else {
        console.log('Migration successful!', data);
    }

    // Verify table exists
    console.log('\nVerifying table...');
    const { data: tableData, error: tableError } = await supabase
        .from('daily_capacity')
        .select('*')
        .limit(1);

    if (tableError) {
        console.error('Table verification failed:', tableError.message);
    } else {
        console.log('Table daily_capacity exists and is accessible!');
    }
}

runMigration();
