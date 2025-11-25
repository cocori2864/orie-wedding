"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";
import { updateOrderStatus, updateOrderStatusToProductionCompleted, confirmFinalPaymentAction } from "../app/actions/updateOrderStatus";

interface OrderStatusActionsProps {
    orderId: string;
    currentStatus: string;
    finalPaymentStatus?: string;
    customerPhone?: string;
    customerName?: string;
    totalAmount: number;
}

export function OrderStatusActions({ orderId, currentStatus, finalPaymentStatus, customerPhone, customerName, totalAmount }: OrderStatusActionsProps) {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // 잔금 요청 모달
    const [showAmountModal, setShowAmountModal] = useState(false);
    const [requestAmount, setRequestAmount] = useState(Math.max(0, totalAmount - 50000));

    const updateStatus = async (newStatus: string, message: string) => {
        if (!confirm("상태를 변경하시겠습니까?")) return;
        setLoading(true);

        const result = await updateOrderStatus(orderId, newStatus);

        if (!result.success) {
            console.error(result.error);
            alert("오류가 발생했습니다: " + result.error);
        } else {
            alert(message);
            router.refresh();
        }
        setLoading(false);
    };

    const confirmFinalPayment = async () => {
        if (!confirm("잔금 입금을 확인하시겠습니까?")) return;
        setLoading(true);

        const result = await confirmFinalPaymentAction(orderId);

        if (!result.success) {
            console.error(result.error);
            alert("오류가 발생했습니다.");
        } else {
            alert("잔금 입금이 확인되었습니다.");
            router.refresh();
        }
        setLoading(false);
    };

    const handleProductionCompleted = async () => {
        if (requestAmount < 0) {
            alert("유효한 잔금 금액을 입력해주세요.");
            return;
        }

        setLoading(true);
        const result = await updateOrderStatusToProductionCompleted(
            orderId,
            requestAmount,
            customerPhone || '',
            customerName || ''
        );

        if (result.success) {
            alert("제작 완료 처리되었습니다. 알림톡이 발송되었습니다.");
            setShowAmountModal(false);
            router.refresh();
        } else {
            alert("처리 중 오류가 발생했습니다: " + result.error);
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
                    onClick={() => setShowAmountModal(true)}
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

            {/* 잔금 요청 모달 */}
            {showAmountModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-bold mb-4 text-gray-900">잔금 요청 금액 설정</h3>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">잔금 금액</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">₩</span>
                                <input
                                    type="number"
                                    value={requestAmount}
                                    onChange={(e) => setRequestAmount(Number(e.target.value))}
                                    className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                총 금액: {totalAmount.toLocaleString()}원 / 기본 예약금: 50,000원
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAmountModal(false)}
                                className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleProductionCompleted}
                                disabled={loading}
                                className="flex-1 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                            >
                                {loading ? '처리중...' : '확인 및 발송'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
