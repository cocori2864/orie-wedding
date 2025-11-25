'use server'

import { createClient } from "../../lib/supabase/server";

export async function processPayment(orderId: string, paymentId: string, amount: number, method: string) {
    const supabase = await createClient();

    // 주문 상태 업데이트
    const { error } = await supabase
        .from('orders')
        .update({
            final_payment_status: 'paid',
            final_payment_method: method,
            payment_id: paymentId,
            final_payment_amount: amount,
            status: 'completed' // 잔금 결제 완료 시 주문 완료 처리
        })
        .eq('id', orderId);

    if (error) {
        console.error("Payment update error:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
