'use server'

import { createAdminClient } from "../../lib/supabase/admin";
import { createClient } from "../../lib/supabase/server";

export async function getOrderDetails(orderId: string) {
    // Try to get authenticated user first
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Use admin client to fetch order (to support guest orders)
    const adminSupabase = createAdminClient();

    try {
        const { data: order, error } = await adminSupabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error) throw error;

        // Security check
        if (order.user_id) {
            // If it's a member order, only allow the owner or admin
            if (!user || user.id !== order.user_id) {
                // TODO: Check if user is admin
                return { success: false, error: "접근 권한이 없습니다." };
            }
        } else {
            // Guest order: Allow fetching, but password verification should be done on client
            // or we can verify here if password is provided.
            // For now, return the order, but mask sensitive info if needed.
        }

        return { success: true, order };
    } catch (error: any) {
        console.error("Get order details error:", error);
        return { success: false, error: "주문 정보를 불러올 수 없습니다." };
    }
}
