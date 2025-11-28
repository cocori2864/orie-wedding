'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { processPayment } from '../../actions/processPayment';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [message, setMessage] = useState('결제를 처리하고 있습니다...');

    useEffect(() => {
        const confirmPayment = async () => {
            const orderId = searchParams.get('orderId');
            const paymentKey = searchParams.get('paymentKey');
            const amount = searchParams.get('amount');

            if (!orderId || !paymentKey || !amount) {
                setStatus('error');
                setMessage('결제 정보가 올바르지 않습니다.');
                return;
            }

            try {
                const result = await processPayment(
                    orderId,
                    paymentKey,
                    parseInt(amount),
                    'card'
                );

                if (result.success) {
                    setStatus('success');
                    setMessage('결제가 완료되었습니다!');
                    setTimeout(() => {
                        router.push('/mypage');
                    }, 2000);
                } else {
                    setStatus('error');
                    setMessage(result.error || '결제 처리에 실패했습니다.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('결제 처리 중 오류가 발생했습니다.');
            }
        };

        confirmPayment();
    }, [searchParams, router]);

    return (
        <div className="max-w-md mx-auto p-6 pt-20 text-center">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                {status === 'processing' && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orie-text mx-auto mb-4"></div>
                        <p className="text-gray-600">{message}</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h1 className="text-xl font-bold text-orie-text mb-2">결제 완료</h1>
                        <p className="text-gray-600">{message}</p>
                        <p className="text-sm text-gray-400 mt-4">잠시 후 마이페이지로 이동합니다...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <div className="text-red-500 text-5xl mb-4">✕</div>
                        <h1 className="text-xl font-bold text-orie-text mb-2">결제 실패</h1>
                        <p className="text-gray-600">{message}</p>
                        <button
                            onClick={() => router.back()}
                            className="mt-6 px-6 py-2 bg-orie-text text-white rounded hover:opacity-90"
                        >
                            다시 시도
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="max-w-md mx-auto p-6 pt-20 text-center">
                <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orie-text mx-auto mb-4"></div>
                    <p className="text-gray-600">로딩중...</p>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
