"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

import MyPageSidebar from "../../components/MyPageSidebar";

// Mock order data
const ORDERS = [
    {
        id: "ORD-2024-001",
        date: "2024-01-15",
        status: "배송완료",
        statusType: "delivered",
        items: [
            { name: "클래식 로즈 부케", quantity: 1, price: 180000 },
            { name: "화이트 피오니 부케", quantity: 1, price: 220000 },
        ],
        total: 400000,
    },
    {
        id: "ORD-2024-002",
        date: "2024-01-20",
        status: "배송중",
        statusType: "shipping",
        items: [{ name: "프리미엄 캐스케이드 부케", quantity: 1, price: 350000 }],
        total: 350000,
    },
];

export default function MyPage() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
            }
            setLoading(false);
        };

        checkUser();
    }, [router, supabase]);

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

                        {ORDERS.length === 0 ? (
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
                                {ORDERS.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border border-orie-text/10 p-6"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm font-medium text-orie-text">
                                                    {order.id}
                                                </p>
                                                <p className="text-xs text-orie-text/60 mt-1">
                                                    {order.date}
                                                </p>
                                            </div>
                                            <span
                                                className={`text-xs px-3 py-1 ${order.statusType === "delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.statusType === "shipping"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="border-t border-orie-text/10 pt-4">
                                            {order.items.map((item, idx) => (
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
