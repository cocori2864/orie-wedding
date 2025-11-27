'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function getCustomers() {
    const supabase = createAdminClient();

    try {
        // 1. Fetch profiles (for role)
        const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (profilesError) throw profilesError;

        // 2. Fetch auth users (for phone/email/metadata)
        const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

        if (usersError) throw usersError;

        // 3. Merge data
        const mergedData = profiles.map(profile => {
            const authUser = users.find(u => u.id === profile.id);
            const phone = authUser?.user_metadata?.phone || profile.phone;
            console.log(`Merged User ${profile.email}: Phone=${phone}`);
            return {
                ...profile,
                email: authUser?.email || profile.email,
                phone: phone, // Fallback to auth metadata
                name: authUser?.user_metadata?.name || profile.name,
            };
        });

        return { data: mergedData, error: null };
    } catch (error: any) {
        console.error("Error fetching customers:", error);
        return { data: null, error: error.message };
    }
}
