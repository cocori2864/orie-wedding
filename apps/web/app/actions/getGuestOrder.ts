'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function getGuestOrder(orderId: string, password: string) {
    const supabase = createAdminClient();

    try {
        // 1. Fetch order by ID (using admin client to bypass RLS)
        const { data: order, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    products (*)
                )
            `)
            .eq('id', orderId)
            .single();

        if (error) throw error;
        if (!order) throw new Error('Order not found');

        // 2. Verify password
        const guestInfo = order.guest_info as { password?: string } | null;
        
        if (!guestInfo || !guestInfo.password) {
             throw new Error('Not a guest order or no password set');
        }

        if (guestInfo.password !== password) {
            return { success: false, error: 'Password incorrect' };
        }

        // 3. Return order data (sanitize if necessary, but here we return full order)
        return { success: true, data: order };

    } catch (error: any) {
        console.error("Error fetching guest order:", error);
        return { success: false, error: error.message || 'Failed to fetch order' };
    }
}
