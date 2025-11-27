'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function getGuestOrder(name: string, phone: string, password: string) {
    const supabase = createAdminClient();

    try {
        // 1. Find order by name and phone
        const { data: orders, error: searchError } = await supabase
            .from('orders')
            .select('id, guest_info')
            .eq('customer_name', name)
            .eq('customer_phone', phone)
            .is('user_id', null) // Only guest orders
            .order('created_at', { ascending: false });

        if (searchError) throw searchError;

        if (!orders || orders.length === 0) {
            return { success: false, error: "일치하는 주문 정보가 없습니다." };
        }

        // 2. Verify password
        const matchedOrder = orders.find(order => {
            const guestInfo = order.guest_info as any;
            return guestInfo?.password === password;
        });

        if (!matchedOrder) {
            return { success: false, error: "비밀번호가 일치하지 않습니다." };
        }

        return { success: true, orderId: matchedOrder.id };
    } catch (error: any) {
        console.error("Guest order lookup error:", error);
        return { success: false, error: "주문 조회 중 오류가 발생했습니다." };
    }
}
