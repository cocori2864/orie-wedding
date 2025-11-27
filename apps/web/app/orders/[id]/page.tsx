"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderDetails } from "../../actions/getOrderDetails";
import Link from "next/link";

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!params.id) return;

            try {
                const result = await getOrderDetails(params.id as string);

                if (!result.success) {
                    throw new Error(result.error);
                }

                const orderData = result.order;

                // Guest verification
                if (!orderData.user_id) {
                    const savedPassword = sessionStorage.getItem(`guest_order_${orderData.id}`);
                    const guestInfo = orderData.guest_info as any;

                    if (!savedPassword || savedPassword !== guestInfo?.password) {
                        // If password doesn't match or not found, redirect to login/lookup
                        alert("비회원 주문 조회 권한이 만료되었거나 유효하지 않습니다. 다시 조회해주세요.");
                        router.push("/login");
                        return;
                    }
                }

                setOrder(orderData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orie-bg">
                <div className="text-orie-text">주문 정보를 불러오는 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-orie-bg gap-4">
                <div className="text-red-600">{error}</div>
                <Link href="/" className="text-orie-text underline">홈으로 돌아가기</Link>
            </div>
        );
    }

    if (!order) return null;

    return (
        <main className="min-h-screen bg-orie-bg py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-sm p-8 md:p-12">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-2xl md:text-3xl text-orie-text mb-4">주문 상세 내역</h1>
                    <p className="text-sm text-orie-text/60">주문번호: {order.id}</p>
                </div>

                {/* Order Status */}
                <div className="mb-12 p-6 bg-gray-50 border border-gray-100 text-center">
                    <span className="text-sm text-orie-text/60 block mb-2">주문 상태</span>
                    <span className="text-xl font-semibold text-orie-text">
                        {order.status === 'pending' && '예약 접수 (입금 대기)'}
                        {order.status === 'confirmed' && '예약 확정'}
                        {order.status === 'cancelled' && '취소됨'}
                        {order.status === 'completed' && '완료됨'}
                    </span>
                    {order.status === 'pending' && (
                        <p className="mt-4 text-sm text-orie-text/80">
                            아래 계좌로 입금해주시면 예약이 확정됩니다.<br />
                            <span className="font-bold mt-2 block">우리은행 1002-559-366067 (예금주: 오리에)</span>
                        </p>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Order Info */}
                    <div>
                        <h3 className="font-serif text-lg text-orie-text mb-6 pb-2 border-b border-gray-100">예약 정보</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-orie-text/60">예식일</span>
                                <span className="text-orie-text">{order.wedding_date} {order.wedding_time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-orie-text/60">예식 장소</span>
                                <span className="text-orie-text text-right">{order.venue}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-orie-text/60">수령 장소</span>
                                <span className="text-orie-text text-right">{order.pickup_location}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-orie-text/60">예약자명</span>
                                <span className="text-orie-text">{order.customer_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-orie-text/60">연락처</span>
                                <span className="text-orie-text">{order.customer_phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h3 className="font-serif text-lg text-orie-text mb-6 pb-2 border-b border-gray-100">결제 정보</h3>
                        <div className="space-y-4 text-sm">
                            {order.items && order.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-start">
                                    <span className="text-orie-text/60">{item.name} x {item.quantity}</span>
                                    <span className="text-orie-text">{(item.price * item.quantity).toLocaleString()}원</span>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-gray-100 flex justify-between font-semibold text-lg">
                                <span className="text-orie-text">총 결제 금액</span>
                                <span className="text-orie-text">{order.total_amount?.toLocaleString()}원</span>
                            </div>
                        </div>
                    </div>
                </div>

                {order.requests && (
                    <div className="mt-12">
                        <h3 className="font-serif text-lg text-orie-text mb-6 pb-2 border-b border-gray-100">요청 사항</h3>
                        <p className="text-sm text-orie-text/80 bg-gray-50 p-4 rounded-sm">
                            {order.requests}
                        </p>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link href="/" className="inline-block px-8 py-3 border border-orie-text text-orie-text text-sm hover:bg-gray-50 transition-colors">
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </main>
    );
}
