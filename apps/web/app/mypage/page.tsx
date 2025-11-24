"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import { getUserOrders } from "../../lib/services/orders";

import MyPageSidebar from "../../components/MyPageSidebar";

export default function MyPage() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAndFetchOrders = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setUser(user);

            // Fetch orders
            try {
                const userOrders = await getUserOrders(user.id);

                // Transform data for UI
                const formattedOrders = userOrders.map((order: any) => ({
                    id: order.id,
                    displayId: order.id.slice(0, 8).toUpperCase(),
                    date: new Date(order.created_at).toLocaleDateString('ko-KR'),
                    status: getStatusText(order.status),
                    statusType: order.status,
                    items: order.order_items.map((item: any) => ({
                        name: item.products?.name || "Unknown Product",
                        quantity: item.quantity,
                        price: item.price_at_purchase
                    })),
                    total: order.total_amount,
                }));

                setOrders(formattedOrders);
            } catch (error) {
                console.error("Error loading orders:", error);
            } finally {
                setLoading(false);
            }
        };

        checkUserAndFetchOrders();
    }, [router, supabase]);

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            pending: '결제 대기',
            paid: '결제 완료',
            preparing: '준비 중',
            shipped: '배송 중',
            delivered: '배송 완료',
            cancelled: '취소됨',
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'shipped':
            case 'preparing':
                return 'bg-blue-100 text-blue-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
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

    if (!user) {
        return null;
    }

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-4 text-orie-text">마이페이지</h1>
                <p className="text-center text-orie-text/60 mb-16">
                    {user.user_metadata?.name || user.email}님, 환영합니다
                </p>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <MyPageSidebar />

                    {/* Content */}
                    <div className="flex-1">
                        <h2 className="text-lg font-medium mb-8 text-orie-text">주문 내역</h2>

                        {orders.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-orie-text/60 mb-6">주문 내역이 없습니다</p>
                                <Link
                                    href="/shop"
                                    className="inline-block px-8 py-3 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                                >
                                    쇼핑하러 가기
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border border-orie-text/10 p-6"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm font-medium text-orie-text">
                                                    #{order.displayId}
                                                </p>
                                                <p className="text-xs text-orie-text/60 mt-1">
                                                    {order.date}
                                                </p>
                                            </div>
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.statusType)}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="border-t border-orie-text/10 pt-4">
                                            {order.items.map((item: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="flex justify-between text-sm py-2"
                                                >
                                                    <span className="text-orie-text">
                                                        {item.name} × {item.quantity}
                                                    </span>
                                                    <span className="text-orie-text/60">
                                                        ₩{(item.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-orie-text/10 pt-4 mt-2 flex justify-between">
                                            <span className="text-sm font-medium text-orie-text">
                                                총 금액
                                            </span>
                                            <span className="text-sm font-medium text-orie-text">
                                                ₩{order.total.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
