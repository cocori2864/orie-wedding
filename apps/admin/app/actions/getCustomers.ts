'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function getCustomers() {
    const supabase = createAdminClient();

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error("Error fetching customers:", error);
        return { data: null, error: error.message };
    }
}
