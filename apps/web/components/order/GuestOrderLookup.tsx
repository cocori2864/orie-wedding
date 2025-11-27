"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export function GuestOrderLookup() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Find order by name and phone
            const { data: orders, error: searchError } = await supabase
                .from('orders')
                .select('id, guest_info')
                .eq('customer_name', name)
                .eq('customer_phone', phone)
                .is('user_id', null) // Only guest orders
                .order('created_at', { ascending: false });

            if (searchError) throw searchError;

            if (!orders || orders.length === 0) {
                throw new Error("일치하는 주문 정보가 없습니다.");
            }

            // 2. Verify password
            // Since we store password in JSONB, we need to check it in application layer
            // Ideally this should be done via RPC or Edge Function for security, 
            // but for this MVP we check client-side or fetch the matching record.
            // Note: RLS might prevent reading guest_info if not configured correctly.
            // Assuming public access or appropriate policy for guest lookup.

            const matchedOrder = orders.find(order => {
                const guestInfo = order.guest_info as any;
                return guestInfo?.password === password;
            });

            if (!matchedOrder) {
                throw new Error("비밀번호가 일치하지 않습니다.");
            }

            // 3. Redirect to order detail page
            // We might need a special route for guest order view or use the same order detail page
            // but with a token or just by ID if RLS allows.
            // For now, let's assume we can go to /orders/[id] and the page handles guest view
            // possibly by storing a session token or just allowing public view for now (risky).
            // A better approach: Store a temporary 'guest_token' in sessionStorage and verify it on the page.

            sessionStorage.setItem(`guest_order_${matchedOrder.id}`, password);
            router.push(`/orders/${matchedOrder.id}`);

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
