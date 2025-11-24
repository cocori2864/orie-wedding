import { createClient } from '../supabase/server';

export async function getAllOrders() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      profiles (
        name,
        email,
        phone
      ),
      order_items (
        *,
        products (
          name,
          image
        )
      )
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }

    return data;
}

export async function getOrderById(orderId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      profiles (
        name,
        email,
        phone
      ),
      order_items (
        *,
        products (
          name,
          image,
          price
        )
      )
    `)
        .eq('id', orderId)
        .single();

    if (error) {
        console.error(`Error fetching order ${orderId}:`, error);
        return null;
    }

    return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

    if (error) {
        console.error(`Error updating order ${orderId}:`, error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
