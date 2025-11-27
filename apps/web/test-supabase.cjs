const { createClient } = require('@supabase/supabase-js');

const url = 'https://sxrasjyjvjngqvrqkjnk.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cmFzanlqdmpuZ3F2cnFram5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDE0NjQsImV4cCI6MjA3OTUxNzQ2NH0.uTKVErGAJX4Cd-lf4BnfnygOIlbn1wGelgTOtRc47m0';

const supabase = createClient(url, anonKey);

async function test() {
    console.log("Testing Supabase Connection...");
    try {
        const { data, error } = await supabase.from('products').select('*').limit(1);
        if (error) {
            console.error("Connection Failed:", error.message);
        } else {
            console.log("Connection Successful!");
            console.log("Data:", data);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

test();
