"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

export default function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const orderId = searchParams.get("orderId");
    const paymentKey = searchParams.get("paymentKey");
    const amount = searchParams.get("amount");

    useEffect(() => {
        const processPayment = async () => {
            if (!orderId || !paymentKey || !amount) {
                setError("결제 정보가 올바르지 않습니다.");
                setLoading(false);
                return;
            }

            try {
                const supabase = createClient();

                // Update order status to 'paid'
                const { error: updateError } = await supabase
                    .from('orders')
                    .update({
                        status: 'paid',
                        payment_method: 'toss_card'
                    })
                    .eq('id', orderId);

                if (updateError) throw updateError;

                setLoading(false);

                // Redirect to order complete page after 3 seconds
                setTimeout(() => {
                    router.push(`/checkout/complete?orderId=${orderId}`);
                }, 3000);
            } catch (err: any) {
                console.error("결제 처리 오류:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        processPayment();
    }, [orderId, paymentKey, amount, router]);

    if (loading) {
        return (
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[600px] mx-auto px-5 md:px-10 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-orie-text border-t-transparent rounded-full mx-auto mb-6"></div>
                    <h1 className="text-2xl font-light mb-4 text-orie-text">결제 처리 중...</h1>
                    <p className="text-orie-text/60">잠시만 기다려주세요.</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[600px] mx-auto px-5 md:px-10 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-light mb-4 text-orie-text">결제 처리 실패</h1>
                    <p className="text-orie-text/60 mb-8">{error}</p>
                    <Link
                        href="/checkout"
                        className="inline-block px-8 py-3 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                    >
                        다시 시도하기
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[600px] mx-auto px-5 md:px-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-light mb-4 text-orie-text">결제가 완료되었습니다!</h1>
                <p className="text-orie-text/60 mb-8">주문 페이지로 이동합니다...</p>
            </div>
        </main>
    );
}
