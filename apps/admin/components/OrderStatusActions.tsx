"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

interface OrderStatusActionsProps {
    orderId: string;
    currentStatus: string;
    finalPaymentStatus?: string;
}

export function OrderStatusActions({ orderId, currentStatus, finalPaymentStatus }: OrderStatusActionsProps) {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const updateStatus = async (newStatus: string, message: string) => {
        if (!confirm("상태를 변경하시겠습니까?")) return;
        setLoading(true);

        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            console.error(error);
            alert("오류가 발생했습니다.");
        } else {
            alert(message);
            router.refresh();
        }
        setLoading(false);
    };

    const confirmFinalPayment = async () => {
        if (!confirm("잔금 입금을 확인하시겠습니까?")) return;
        setLoading(true);

        const { error } = await supabase
            .from('orders')
            .update({
                status: 'completed',
                final_payment_status: 'paid'
            })
            .eq('id', orderId);

        if (error) {
            console.error(error);
            alert("오류가 발생했습니다.");
        } else {
            alert("잔금 입금이 확인되었습니다.");
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="space-y-3">
            {currentStatus === 'pending' && (
                <button
                    onClick={() => updateStatus('payment_pending', '예약 확인 완료. 알림톡이 발송되었습니다.')}
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    예약 확인 (계좌 발송)
                </button>
            )}
            {currentStatus === 'payment_pending' && (
                <button
                    onClick={() => updateStatus('confirmed', '입금 확인 완료. 예약이 확정되었습니다.')}
                    disabled={loading}
                    className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                    입금 확인 (예약 확정)
                </button>
            )}
            {currentStatus === 'confirmed' && (
                <button
                    onClick={() => updateStatus('production_completed', '제작 완료 처리되었습니다. 잔금 결제 요청이 발송됩니다.')}
                    disabled={loading}
                    className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                    제작 완료 (잔금 요청)
                </button>
            )}

            {/* 잔금 입금 확인 대기 중일 때 */}
            {finalPaymentStatus === 'verification_pending' && (
                <button
                    onClick={confirmFinalPayment}
                    disabled={loading}
                    className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                    잔금 입금 확인 (완료 처리)
                </button>
            )}

            {currentStatus === 'production_completed' && finalPaymentStatus !== 'verification_pending' && (
                <button
                    onClick={() => updateStatus('completed', '주문이 완료되었습니다.')}
                    disabled={loading}
                    className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:opacity-50"
                >
                    주문 완료 처리
                </button>
            )}

            {currentStatus !== 'cancelled' && (
                <button
                    onClick={() => updateStatus('cancelled', '주문이 취소되었습니다.')}
                    disabled={loading}
                    className="w-full py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 disabled:opacity-50"
                >
                    주문 취소
                </button>
            )}
        </div>
    );
}
