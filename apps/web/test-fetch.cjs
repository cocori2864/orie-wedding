const url = 'https://sxrasjyjvjngqvrqkjnk.supabase.co';

async function testFetch() {
    console.log(`Fetching ${url}...`);
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        console.log(`Headers:`, res.headers);
    } catch (e) {
        console.error("Fetch failed:", e);
        if (e.cause) console.error("Cause:", e.cause);
    }
}

testFetch();
