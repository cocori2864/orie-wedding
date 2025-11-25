'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function createProduct(productData: any) {
    const supabase = createAdminClient();

    try {
        const { error } = await supabase.from('products').insert(productData);

        if (error) throw error;
        return { error: null };
    } catch (error: any) {
        console.error("Error creating product:", error);
        return { error: error.message };
    }
}
