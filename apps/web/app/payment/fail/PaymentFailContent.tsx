"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";

export default function PaymentFailContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message") || "결제 처리 중 문제가 발생했습니다.";
    const code = searchParams.get("code");

    return (
        <main className="pt-32 pb-20 min-h-screen bg-gray-50">
            <div className="w-full max-w-[600px] mx-auto px-5 md:px-10">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>

                    <h1 className="text-2xl md:text-3xl font-serif font-medium mb-4 text-gray-900">
                        결제에 실패했습니다
                    </h1>

                    <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <p className="text-gray-600 mb-1">{message}</p>
                        {code && (
                            <p className="text-xs text-gray-400 font-mono">Error Code: {code}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/checkout"
                            className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <RefreshCcw size={18} />
                            다시 결제하기
                        </Link>
                        <Link
                            href="/cart"
                            className="flex items-center justify-center gap-2 w-full px-8 py-4 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            장바구니로 돌아가기
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-2">도움이 필요하신가요?</p>
                        <p className="text-sm text-gray-600">
                            고객센터 <span className="font-medium text-gray-900">02-1234-5678</span> 또는
                            <br />
                            <a href="mailto:support@orie.com" className="text-blue-600 hover:underline">support@orie.com</a>으로 문의해주세요.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
