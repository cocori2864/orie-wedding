'use client';

import { useEffect, useState, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { createClient } from '../../../lib/supabase/client';

// 토스페이먼츠 테스트 클라이언트 키
const TOSS_CLIENT_KEY = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentReady, setPaymentReady] = useState(false);
    const tossPaymentsRef = useRef<any>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchOrder = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                alert("주문 정보를 불러오는데 실패했습니다.");
                router.push('/mypage');
                return;
            }
            setOrder(data);
            setLoading(false);
        };
        fetchOrder();
    }, [id, router, supabase]);

    useEffect(() => {
        const initTossPayments = async () => {
            try {
                const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
                tossPaymentsRef.current = tossPayments;
                setPaymentReady(true);
            } catch (error) {
                console.error('토스페이먼츠 로드 실패:', error);
            }
        };
        initTossPayments();
    }, []);

    const handleCardPayment = async () => {
        if (!tossPaymentsRef.current || !paymentReady) {
            alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        const finalAmount = order.final_payment_request_amount ?? Math.max(0, order.total_amount - 50000);

        if (finalAmount === 0) {
            alert("결제할 잔금이 없습니다.");
            return;
        }

        const tossOrderId = `ORDER_${order.id.slice(0, 8)}_${Date.now()}`;

        try {
            await tossPaymentsRef.current.requestPayment('카드', {
                amount: finalAmount,
                orderId: tossOrderId,
                orderName: `[잔금] ${order.items?.[0]?.name || '주문 상품'}`,
                customerName: order.guest_info?.name || order.customer_name || '고객',
                successUrl: `${window.location.origin}/payment/success?orderId=${order.id}`,
                failUrl: `${window.location.origin}/payment/fail?orderId=${order.id}`,
            });
        } catch (error: any) {
            if (error.code === 'USER_CANCEL') {
                // 사용자가 취소한 경우
                return;
            }
            alert(`결제에 실패하였습니다: ${error.message}`);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    const finalAmount = order.final_payment_request_amount ?? Math.max(0, order.total_amount - 50000);
    const deposit = order.total_amount - finalAmount;

    return (
        <div className="max-w-2xl mx-auto p-6 pt-20">
            <h1 className="text-2xl font-serif font-bold mb-8 text-orie-text">잔금 결제</h1>

            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
                <div className="space-y-4">
                    <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-600">주문번호</span>
                        <span className="font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-600">상품명</span>
                        <span>{order.items?.[0]?.name || '주문 상품'}</span>
                    </div>
                    <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-600">총 금액</span>
                        <span>{order.total_amount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-600">기납부 예약금</span>
                        <span>-{deposit.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="font-bold text-lg">결제할 잔금</span>
                        <span className="font-bold text-lg text-red-600">
                            {finalAmount.toLocaleString()}원
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <button
                    onClick={handleCardPayment}
                    disabled={!paymentReady}
                    className="w-full bg-orie-text text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {paymentReady
                        ? `${finalAmount.toLocaleString()}원 결제하기 (카드/간편결제)`
                        : '결제 모듈 로딩중...'
                    }
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    토스페이먼츠를 통해 안전하게 결제됩니다.
                </p>
                <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-600 text-center">
                    <p>무통장 입금을 원하시는 경우, 알림톡으로 안내된 계좌로 입금해주시면 됩니다.</p>
                </div>
            </div>
        </div>
    );
}
