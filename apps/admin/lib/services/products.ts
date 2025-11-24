import { createClient } from '../supabase/server';

export async function getProducts(filters?: { category?: string; status?: string; search?: string }) {
    const supabase = await createClient();

    let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
    }

    if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
    }

    if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data;
}
