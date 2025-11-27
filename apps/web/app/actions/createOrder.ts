'use server'

import { createClient } from "../../lib/supabase/server";
import { createAdminClient } from "../../lib/supabase/admin";
import { sendBankInfoAlimtalk } from "../../lib/alimtalk";

export async function createOrder(orderData: any, customerPhone: string, customerName: string, guestPassword?: string) {
    // Use admin client for DB operations to bypass RLS (especially for guest orders)
    const supabase = createAdminClient();

    try {
        // 0. Check Capacity
        const weddingDate = orderData.wedding_date;
        if (weddingDate) {
            // Check if there is a limit for this date
            const { data: capacity, error: capacityError } = await supabase
                .from('daily_capacity')
                .select('max_slots')
                .eq('date', weddingDate)
                .single();

            console.log(`[createOrder] Date: ${weddingDate}, Capacity:`, capacity, "Error:", capacityError?.code);

            if (capacity) {
                // if (capacity.max_slots === 0) {
                //     console.log('[createOrder] Blocked: max_slots is 0');
                //     throw new Error("해당 날짜는 예약이 마감되었습니다.");
                // }

                // Check current order count
                // Use range query to handle both DATE and TIMESTAMP types safely
                const nextDate = new Date(weddingDate);
                nextDate.setDate(nextDate.getDate() + 1);
                const nextDateString = nextDate.toISOString().split('T')[0];

                const { count, error: countError } = await supabase
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .gte('wedding_date', weddingDate)
                    .lt('wedding_date', nextDateString)
                    .neq('status', 'cancelled');

                if (countError) {
                    console.error("[createOrder] Count Error:", countError);
                    throw countError;
                }

                console.log(`[createOrder] Date: ${weddingDate}, Count: ${count}, Max Slots: ${capacity.max_slots} (Parsed: ${Number(capacity.max_slots)})`);

                // max_slots가 null이면 무제한이므로 체크하지 않음
                // 또한 max_slots가 0인 경우도 무제한으로 처리 (사용자 요청)
                // DB에서 문자열로 올 수 있으므로 Number()로 변환
                const maxSlots = Number(capacity.max_slots);

                if (capacity.max_slots !== null && maxSlots !== 0 && count !== null && count >= maxSlots) {
                    console.log('[createOrder] Blocked: count >= max_slots');
                    throw new Error("해당 날짜의 예약이 마감되었습니다.");
                }
            } else {
                console.log('[createOrder] No capacity record found (Unlimited)');
            }
        }

        // 0.5. 비회원 비밀번호 추가
        if (guestPassword) {
            orderData.guest_info = {
                ...orderData.guest_info,
                password: guestPassword
            };
        }

        // 1. 주문 저장
        const { data, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();

        if (error) throw error;

        // 2. 알림톡 발송
        // 실패하더라도 주문은 성공한 것이므로 에러를 던지지 않음
        try {
            await sendBankInfoAlimtalk(customerPhone, customerName, orderData.total_amount);
        } catch (alimtalkError) {
            console.error("알림톡 발송 중 에러 (주문은 성공):", alimtalkError);
        }

        return { success: true, data };
    } catch (error: any) {
        console.error("주문 생성 실패:", error);
        return { success: false, error: error.message };
    }
}
