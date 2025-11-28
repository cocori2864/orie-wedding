'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function PaymentFailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const errorCode = searchParams.get('code');
    const errorMessage = searchParams.get('message');

    return (
        <div className="max-w-md mx-auto p-6 pt-20 text-center">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-red-500 text-5xl mb-4">✕</div>
                <h1 className="text-xl font-bold text-orie-text mb-2">결제 실패</h1>
                <p className="text-gray-600 mb-2">
                    {errorMessage || '결제가 취소되었거나 실패했습니다.'}
                </p>
                {errorCode && (
                    <p className="text-sm text-gray-400">에러 코드: {errorCode}</p>
                )}
                <button
                    onClick={() => router.back()}
                    className="mt-6 px-6 py-2 bg-orie-text text-white rounded hover:opacity-90"
                >
                    다시 시도
                </button>
            </div>
        </div>
    );
}

export default function PaymentFailPage() {
    return (
        <Suspense fallback={
            <div className="max-w-md mx-auto p-6 pt-20 text-center">
                <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orie-text mx-auto mb-4"></div>
                    <p className="text-gray-600">로딩중...</p>
                </div>
            </div>
        }>
            <PaymentFailContent />
        </Suspense>
    );
}
