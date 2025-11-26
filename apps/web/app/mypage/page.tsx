"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import MyPageSidebar from "../../components/MyPageSidebar";

export default function MyPage() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cancel Modal State
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    router.push("/login");
                    return;
                }

                setUser(user);

                // Fetch orders
                const { data: userOrders, error: fetchError } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (fetchError) throw fetchError;

                // Transform data for UI
                const formattedOrders = userOrders.map((order: any) => {
                    const dateObj = new Date(order.created_at);
                    const kstDate = new Date(dateObj.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
                    const year = kstDate.getFullYear();
                    const month = String(kstDate.getMonth() + 1).padStart(2, '0');
                    const day = String(kstDate.getDate()).padStart(2, '0');
                    const hours = String(kstDate.getHours()).padStart(2, '0');
                    const minutes = String(kstDate.getMinutes()).padStart(2, '0');
                    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

                    return {
                        id: order.id,
                        displayId: order.id.slice(0, 8).toUpperCase(),
                        date: formattedDate,
                        status: getStatusText(order.status),
                        statusType: order.status,
                        items: order.items, // JSONB array
                        total: order.total_amount,
                        weddingDate: order.wedding_date,
                        pickupLocation: order.pickup_location
                    };
                });

                setOrders(formattedOrders);
            } catch (error) {
                console.error("Error loading orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [router, supabase]);

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            pending: '예약 대기중',
            payment_pending: '예약금 대기 중',
            confirmed: '예약 확정',
            production_completed: '제작 완료 (잔금 대기)',
            completed: '주문 완료',
            cancelled: '취소됨',
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'payment_pending':
                return 'bg-orange-100 text-orange-700';
            case 'production_completed':
                return 'bg-blue-100 text-blue-700';
            case 'completed':
                return 'bg-gray-800 text-white';
            case 'pending':
                return 'bg-gray-100 text-gray-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const handleCancelClick = (order: any) => {
        setSelectedOrder(order);
        setShowCancelModal(true);
    };

    const confirmCancel = async () => {
        if (!selectedOrder) return;

        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: 'cancelled' })
                .eq('id', selectedOrder.id);

            if (error) throw error;

            alert("예약이 취소되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("Error cancelling order:", error);
            alert("예약 취소에 실패했습니다. 관리자에게 문의해주세요.");
        } finally {
            setShowCancelModal(false);
            setSelectedOrder(null);
        }
    };

    // Refund Policy Calculation
    const getRefundInfo = (weddingDateStr: string) => {
        if (!weddingDateStr) return null;

        const weddingDate = new Date(weddingDateStr);
        // Set time to midnight for accurate day calculation
        weddingDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = weddingDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const d14 = new Date(weddingDate);
        d14.setDate(d14.getDate() - 14);

        const d7 = new Date(weddingDate);
        d7.setDate(d7.getDate() - 7);

        let refundStatus = "";
        let refundPercentage = 0;

        if (today <= d14) {
            refundStatus = "100% 환불 가능";
            refundPercentage = 100;
        } else if (today <= d7) {
            refundStatus = "50% 환불 가능";
            refundPercentage = 50;
        } else {
            refundStatus = "환불 불가";
            refundPercentage = 0;
        }

        return {
            weddingDate,
            diffDays,
            d14,
            d7,
            refundStatus,
            refundPercentage
        };
    };

    if (loading) {
        return (
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10 text-center">
                    <p className="text-orie-text/60">로딩 중...</p>
                </div>
            </main>
        );
    }

    if (!user) return null;

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-4 text-orie-text">마이페이지</h1>
                <p className="text-center text-orie-text/60 mb-16">
                    {user.user_metadata?.name || user.email}님, 환영합니다
                </p>

                <div className="flex flex-col md:flex-row gap-12">
                    <MyPageSidebar />

                    <div className="flex-1">
                        <h2 className="text-lg font-medium mb-8 text-orie-text">예약 현황</h2>

                        {orders.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-orie-text/60">예약 내역이 없습니다</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-orie-text/10 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm font-medium text-orie-text">
                                                    예약번호: {order.displayId}
                                                </p>
                                                <p className="text-xs text-orie-text/60 mt-1">
                                                    접수일: {order.date}
                                                </p>
                                            </div>
                                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.statusType)}`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="border-t border-orie-text/10 pt-4">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="flex justify-between text-sm py-2">
                                                    <span className="text-orie-text">
                                                        {item.name} × {item.quantity}
                                                    </span>
                                                    <span className="text-orie-text/60">
                                                        ₩{(item.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {order.weddingDate && (
                                            <div className="mt-4 bg-gray-50 p-3 text-xs text-orie-text/80">
                                                <p>예식일(수령일): {new Date(order.weddingDate).toLocaleDateString()}</p>
                                                <p>수령 장소: {order.pickupLocation}</p>
                                            </div>
                                        )}

                                        <div className="border-t border-orie-text/10 pt-4 mt-2 flex justify-between">
                                            <span className="text-sm font-medium text-orie-text">총 금액</span>
                                            <span className="text-sm font-medium text-orie-text">
                                                ₩{order.total.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* 계좌번호 표시 (예약금 대기 중일 때) */}
                                        {order.statusType === 'payment_pending' && (
                                            <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-md">
                                                <p className="text-sm font-bold text-orange-800 mb-1">입금 계좌 안내</p>
                                                <p className="text-sm text-orange-700">국민은행 123-456-7890 (예금주: 오리에)</p>
                                                <p className="text-xs text-orange-600 mt-1">* 입금자명이 일치해야 자동 확인됩니다.</p>
                                            </div>
                                        )}

                                        {/* 잔금 결제 버튼 */}
                                        {order.statusType === 'production_completed' && (
                                            <div className="mt-4 flex justify-end">
                                                <Link
                                                    href={`/payment/${order.id}`}
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                                                >
                                                    잔금 결제하기
                                                </Link>
                                            </div>
                                        )}

                                        {/* 취소 버튼 */}
                                        {order.statusType !== 'cancelled' && order.statusType !== 'confirmed' && order.statusType !== 'production_completed' && order.statusType !== 'completed' && (
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    onClick={() => handleCancelClick(order)}
                                                    className="text-xs text-red-600 hover:text-red-800 underline"
                                                >
                                                    예약 취소
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-medium mb-4 text-orie-text">예약 취소 및 환불 규정</h3>

                        <div className="text-sm text-orie-text/80 mb-6 space-y-2">
                            <p>수령일(예식일): <strong>{new Date(selectedOrder.weddingDate).toLocaleDateString()}</strong></p>

                            {(() => {
                                const info = getRefundInfo(selectedOrder.weddingDate);
                                if (!info) return null;
                                return (
                                    <div className="bg-gray-50 p-3 rounded mt-2 text-xs space-y-1">
                                        <p className="font-semibold text-orie-text">환불 규정 안내</p>
                                        <p>• 14일 전 ({info.d14.toLocaleDateString()} 00:00) 까지: 100% 환불</p>
                                        <p>• 7일 전 ({info.d7.toLocaleDateString()} 00:00) 까지: 50% 환불</p>
                                        <p>• 7일 미만: 환불 불가</p>

                                        <div className="mt-3 pt-2 border-t border-gray-200">
                                            <p className="text-red-600 font-bold">
                                                현재 상태: {info.refundStatus}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}

                            <p className="mt-4">정말로 예약을 취소하시겠습니까?</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-3 border border-orie-text/20 text-orie-text hover:bg-gray-50"
                            >
                                닫기
                            </button>
                            <button
                                onClick={confirmCancel}
                                className="flex-1 py-3 bg-red-600 text-white hover:bg-red-700"
                            >
                                취소하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
