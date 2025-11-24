import { createClient } from '../supabase/server';
import { ALL_PRODUCTS, PRODUCT_DETAILS } from '../../data/products';

export async function getProducts() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data
        return ALL_PRODUCTS;
    }

    // If no products in DB, use mock data
    if (!data || data.length === 0) {
        console.log('No products in Supabase, using mock data');
        return ALL_PRODUCTS;
    }

    return data;
}

export async function getProduct(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching product ${id}:`, error);
        // Fallback to mock data
        return PRODUCT_DETAILS[id] || null;
    }

    // If product not found in DB, try mock data
    if (!data) {
        return PRODUCT_DETAILS[id] || null;
    }

    return data;
}
