'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function getProduct(id: string) {
    const supabase = createAdminClient();
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
}

export async function updateProduct(id: string, productData: any) {
    const supabase = createAdminClient();
    try {
        const { error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', id);
        if (error) throw error;
        return { error: null };
    } catch (error: any) {
        return { error: error.message };
    }
}
