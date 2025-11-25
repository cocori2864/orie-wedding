'use client';

import { useEffect, useState, use } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import { processPayment } from '../../actions/processPayment';

declare global {
    interface Window {
        IMP: any;
    }
}

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
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

    const handleCardPayment = () => {
        if (!window.IMP) return;
        const { IMP } = window;
        IMP.init('imp00000000'); // 테스트용 가맹점 식별코드

        const finalAmount = order.final_payment_request_amount ?? Math.max(0, order.total_amount - 50000);

        if (finalAmount === 0) {
            alert("결제할 잔금이 없습니다.");
            return;
        }

        const data = {
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: `[잔금] ${order.items[0].name}`,
            amount: finalAmount,
            buyer_email: order.user_email || 'test@test.com',
            buyer_name: order.customer_name,
            buyer_tel: order.customer_phone,
        };

        IMP.request_pay(data, async (rsp: any) => {
            if (rsp.success) {
                const result = await processPayment(order.id, rsp.imp_uid, finalAmount, 'card');
                if (result.success) {
                    alert('결제가 완료되었습니다.');
                    router.push('/mypage');
                } else {
                    alert('결제 처리에 실패했습니다.');
                }
            } else {
                alert(`결제에 실패하였습니다. 에러내용: ${rsp.error_msg}`);
            }
        });
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    const finalAmount = order.final_payment_request_amount ?? Math.max(0, order.total_amount - 50000);
    const deposit = order.total_amount - finalAmount;

    return (
        <div className="max-w-2xl mx-auto p-6 pt-20">
            <Script src="https://cdn.iamport.kr/v1/iamport.js" />
            <h1 className="text-2xl font-serif font-bold mb-8 text-orie-text">잔금 결제</h1>

            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
                <div className="space-y-4">
                    <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-600">주문번호</span>
                        <span className="font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-600">상품명</span>
                        <span>{order.items[0].name}</span>
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
                    className="w-full bg-orie-text text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                >
                    {finalAmount.toLocaleString()}원 결제하기 (카드/간편결제)
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    KG이니시스를 통해 안전하게 결제됩니다.
                </p>
                <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-600 text-center">
                    <p>무통장 입금을 원하시는 경우, 알림톡으로 안내된 계좌로 입금해주시면 됩니다.</p>
                </div>
            </div>
        </div>
    );
}
