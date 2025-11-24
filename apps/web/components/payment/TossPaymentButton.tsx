"use client";

import { useEffect, useRef } from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";

interface TossPaymentButtonProps {
    amount: number;
    orderName: string;
    customerName: string;
    customerEmail?: string;
    onSuccess: (orderId: string) => void;
    onError: (error: any) => void;
}

export function TossPaymentButton({
    amount,
    orderName,
    customerName,
    customerEmail,
    onSuccess,
    onError,
}: TossPaymentButtonProps) {
    const paymentWidgetRef = useRef<any>(null);
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

    useEffect(() => {
        const loadWidget = async () => {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                paymentWidgetRef.current = tossPayments;
            } catch (error) {
                console.error("토스페이먼츠 로드 실패:", error);
            }
        };

        loadWidget();
    }, [clientKey]);

    const handlePayment = async () => {
        if (!paymentWidgetRef.current) {
            alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        try {
            const orderId = `ORDER_${Date.now()}`;

            await paymentWidgetRef.current.requestPayment({
                method: "CARD", // 카드 결제
                amount: {
                    currency: "KRW",
                    value: amount,
                },
                orderId: orderId,
                orderName: orderName,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
                customerEmail: customerEmail,
                customerName: customerName,
            });
        } catch (error: any) {
            console.error("결제 요청 실패:", error);
            onError(error);
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="w-full py-4 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors rounded-md"
        >
            토스페이먼츠로 결제하기
        </button>
    );
}
