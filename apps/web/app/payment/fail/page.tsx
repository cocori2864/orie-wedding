"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailPage() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message") || "결제가 취소되었습니다.";
    const code = searchParams.get("code");

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[600px] mx-auto px-5 md:px-10 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                
                <h1 className="text-3xl font-light mb-4 text-orie-text">결제 실패</h1>
                <p className="text-orie-text/60 mb-2">{message}</p>
                {code && (
                    <p className="text-sm text-orie-text/40 mb-8">오류 코드: {code}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link
                        href="/checkout"
                        className="px-8 py-3 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                    >
                        다시 시도하기
                    </Link>
                    <Link
                        href="/cart"
                        className="px-8 py-3 border border-orie-text text-orie-text text-sm font-semibold hover:bg-orie-text hover:text-white transition-colors"
                    >
                        장바구니로 돌아가기
                    </Link>
                </div>
            </div>
        </main>
    );
}
