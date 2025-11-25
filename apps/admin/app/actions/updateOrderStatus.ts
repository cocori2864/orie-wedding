'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function updateOrderStatusToProductionCompleted(orderId: string, requestAmount: number, customerPhone: string, customerName: string) {
    const supabase = createAdminClient();

    // 1. DB 업데이트
    const { error } = await supabase
        .from('orders')
        .update({
            status: 'production_completed',
            final_payment_request_amount: requestAmount,
            final_payment_status: 'pending'
        })
        .eq('id', orderId);

    if (error) {
        console.error("DB Update Error:", error);
        return { success: false, error: error.message };
    }

    // 2. 알림톡 발송 (Mock)
    // 실제 환경에서는 Solapi 등을 사용하여 알림톡을 발송합니다.
    const paymentLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/${orderId}`;

    console.log("============================================");
    console.log(`[알림톡 발송 Mock]`);
    console.log(`수신번호: ${customerPhone}`);
    console.log(`고객명: ${customerName}`);
    console.log(`잔금금액: ${requestAmount.toLocaleString()}원`);
    console.log(`계좌정보: 국민은행 123-456-7890 (예금주: 오리에)`);
    console.log(`카드결제링크: ${paymentLink}`);
    console.log("============================================");

    return { success: true };
}
