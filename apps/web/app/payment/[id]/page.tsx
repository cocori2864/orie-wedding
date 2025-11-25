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
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
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

        const deposit = 50000;
        const finalAmount = Math.max(0, order.total_amount - deposit);

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

    const handleTransferRequest = async () => {
        if (!confirm("입금 확인 요청을 하시겠습니까?")) return;

        const deposit = 50000;
        const finalAmount = Math.max(0, order.total_amount - deposit);

        const result = await processPayment(order.id, null, finalAmount, 'transfer');
        if (result.success) {
            alert('입금 확인 요청이 접수되었습니다. 관리자 확인 후 완료 처리됩니다.');
            router.push('/mypage');
        } else {
            alert('요청 처리에 실패했습니다.');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    const deposit = 50000;
    const finalAmount = Math.max(0, order.total_amount - deposit);

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

            {/* 결제 수단 선택 */}
            <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">결제 수단 선택</h3>
                <div className="flex gap-4">
                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 py-4 border rounded-lg font-medium transition-colors ${paymentMethod === 'card'
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        카드 / 간편결제
                    </button>
                    <button
                        onClick={() => setPaymentMethod('transfer')}
                        className={`flex-1 py-4 border rounded-lg font-medium transition-colors ${paymentMethod === 'transfer'
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        무통장 입금
                    </button>
                </div>
            </div>

            {paymentMethod === 'card' ? (
                <div>
                    <button
                        onClick={handleCardPayment}
                        className="w-full bg-orie-text text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        {finalAmount.toLocaleString()}원 결제하기
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        KG이니시스를 통해 안전하게 결제됩니다.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2">입금 계좌 안내</h4>
                        <p className="text-lg text-blue-600 font-medium mb-1">국민은행 123-456-7890</p>
                        <p className="text-gray-600">예금주: 오리에</p>
                        <p className="text-sm text-gray-500 mt-4">
                            * 입금자명과 주문자명이 일치해야 빠른 확인이 가능합니다.
                        </p>
                    </div>
                    <button
                        onClick={handleTransferRequest}
                        className="w-full bg-orie-text text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        입금 확인 요청
                    </button>
                </div>
            )}
        </div>
    );
}
