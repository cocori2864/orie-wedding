"use client";

import { useState } from "react";
import { getGuestOrder } from "../actions/getGuestOrder";

export default function GuestOrderLookupPage() {
    const [orderId, setOrderId] = useState("");
    const [password, setPassword] = useState("");
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setOrder(null);
        setLoading(true);

        try {
            const result = await getGuestOrder(orderId, password);
            if (result.success) {
                setOrder(result.data);
            } else {
                setError(result.error || "주문을 찾을 수 없습니다.");
            }
        } catch (err) {
            setError("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-20 px-6">
            <h1 className="text-3xl font-serif text-orie-text mb-8 text-center">비회원 주문 조회</h1>

            <form onSubmit={handleLookup} className="flex flex-col gap-4 mb-10">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">주문 번호 (Order ID)</label>
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="주문 번호를 입력하세요"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="주문 시 설정한 비밀번호"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-orie-text text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "조회 중..." : "조회하기"}
                </button>
            </form>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm text-center mb-8">
                    {error}
                </div>
            )}

            {order && (
                <div className="border border-gray-200 p-6 rounded-lg">
                    <h2 className="text-xl font-serif mb-4 text-orie-text">주문 상세 정보</h2>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">주문 번호</span>
                            <span className="font-mono">{order.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">주문 상태</span>
                            <span className="font-semibold">{order.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">총 결제 금액</span>
                            <span className="font-semibold">{order.total_amount.toLocaleString()}원</span>
                        </div>
                        <div className="border-t border-gray-100 pt-4 mt-4">
                            <h3 className="font-semibold mb-2">주문 상품</h3>
                            {order.order_items?.map((item: any) => (
                                <div key={item.id} className="flex justify-between py-1">
                                    <span>{item.products?.name || "상품"} x {item.quantity}</span>
                                    <span>{item.price_at_purchase.toLocaleString()}원</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-100 pt-4 mt-4">
                            <h3 className="font-semibold mb-2">배송 정보</h3>
                            <div className="text-gray-600">
                                <p>수령인: {order.guest_info?.name || order.customer_name}</p>
                                <p>연락처: {order.guest_info?.phone || order.customer_phone}</p>
                                <p>예식일: {order.delivery_info?.date ? new Date(order.delivery_info.date).toLocaleDateString() : '-'}</p>
                                <p>예식장: {order.delivery_info?.address || '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
