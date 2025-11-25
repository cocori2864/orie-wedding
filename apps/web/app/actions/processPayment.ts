'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function processPayment(orderId: string, paymentId: string | null, amount: number, method: string) {
    const supabase = createAdminClient();

    const updateData: any = {
        final_payment_method: method,
        final_payment_amount: amount,
    };

    if (method === 'card') {
        updateData.final_payment_status = 'paid';
        updateData.payment_id = paymentId;
        updateData.status = 'completed'; // 카드 결제는 즉시 완료 처리
    } else if (method === 'transfer') {
        updateData.final_payment_status = 'verification_pending'; // 입금 확인 대기
        // status는 변경하지 않음 (production_completed 유지)
    }

    // 주문 상태 업데이트
    const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

    if (error) {
        console.error("Payment update error:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
