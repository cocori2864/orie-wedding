"use client";

import Link from "next/link";

export function CartSummary({ subtotal }: { subtotal: number }) {
    const shipping: number = 0; // Free shipping for luxury items usually
    const total = subtotal + shipping;

    return (
        <div className="bg-orie-bg-secondary p-8 h-fit sticky top-24">
            <h2 className="text-lg font-medium mb-6 text-orie-text">주문 요약</h2>

            <div className="flex flex-col gap-4 mb-8 border-b border-orie-text/10 pb-8">
                <div className="flex justify-between text-sm text-orie-text/80">
                    <span>상품 금액</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-orie-text/80">
                    <span>배송비</span>
                    <span>{shipping === 0 ? "무료" : `₩${shipping.toLocaleString()}`}</span>
                </div>
            </div>

            <div className="flex justify-between text-lg font-medium text-orie-text mb-8">
                <span>총 결제금액</span>
                <span>₩{total.toLocaleString()}</span>
            </div>

            <div className="text-center text-sm text-orie-text/60 py-4 border border-orie-text/20">
                결제 시스템 리뉴얼 중입니다.
            </div>
        </div>
    );
}
