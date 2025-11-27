"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGuestOrder } from "../../app/actions/getGuestOrder";

export function GuestOrderLookup() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await getGuestOrder(name, phone, password);

            if (!result.success) {
                throw new Error(result.error);
            }

            if (result.orderId) {
                sessionStorage.setItem(`guest_order_${result.orderId}`, password);
                router.push(`/orders/${result.orderId}`);
            }

        } catch (err: any) {
            console.error("Lookup error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white border-t border-gray-100 mt-8">
            <h3 className="text-lg font-serif text-orie-text mb-6 text-center">비회원 주문 조회</h3>
            <form onSubmit={handleLookup} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="주문자명"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="연락처"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="주문 비밀번호"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 border border-orie-text text-orie-text text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    {loading ? "조회 중..." : "조회하기"}
                </button>
            </form>
        </div>
    );
}
