"use client";

import { GuestOrderLookup } from "../../components/order/GuestOrderLookup";

export default function GuestOrderLookupPage() {
    return (
        <div className="min-h-screen bg-orie-bg flex flex-col items-center justify-center py-20 px-4">
            <h1 className="text-3xl font-serif text-orie-text mb-8 text-center">비회원 주문 조회</h1>
            <GuestOrderLookup />
        </div>
    );
}
