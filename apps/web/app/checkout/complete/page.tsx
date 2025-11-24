"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutCompletePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!orderId) {
            router.push("/");
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/mypage");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [orderId, router]);

    if (!orderId) {
        return null;
    }

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[600px] mx-auto px-5 md:px-10 text-center">
                <div className="mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-10 h-10 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-light mb-4 text-orie-text">주문이 완료되었습니다</h1>
                    <p className="text-orie-text/60 mb-8">
                        주문번호: <span className="font-medium">{orderId.slice(0, 8)}</span>
                    </p>
                </div>

                <div className="bg-orie-bg-secondary p-8 mb-8 text-left">
                    <h2 className="text-lg font-medium mb-4 text-orie-text">주문 안내</h2>
                    <ul className="space-y-3 text-sm text-orie-text/80">
                        <li className="flex items-start gap-2">
                            <span className="text-orie-text">•</span>
                            <span>주문 내역은 마이페이지에서 확인하실 수 있습니다.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orie-text">•</span>
                            <span>배송/픽업 일정에 맞춰 준비하겠습니다.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orie-text">•</span>
                            <span>문의사항은 고객센터로 연락해주세요.</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/mypage"
                        className="px-8 py-3 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                    >
                        주문 내역 보기
                    </Link>
                    <Link
                        href="/shop"
                        className="px-8 py-3 border border-orie-text text-orie-text text-sm font-semibold hover:bg-orie-text hover:text-white transition-colors"
                    >
                        쇼핑 계속하기
                    </Link>
                </div>

                <p className="mt-8 text-sm text-orie-text/60">
                    {countdown}초 후 마이페이지로 이동합니다...
                </p>
            </div>
        </main>
    );
}
