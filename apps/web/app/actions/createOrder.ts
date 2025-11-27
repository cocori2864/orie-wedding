'use server'

import { createClient } from "../../lib/supabase/server";
import { sendBankInfoAlimtalk } from "../../lib/alimtalk";

export async function createOrder(orderData: any, customerPhone: string, customerName: string, guestPassword?: string) {
    const supabase = await createClient();

    try {
        // 0. 비회원 비밀번호 추가
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
