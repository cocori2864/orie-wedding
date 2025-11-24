import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[600px] mx-auto px-5 md:px-10 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-orie-text border-t-transparent rounded-full mx-auto mb-6"></div>
                    <h1 className="text-2xl font-light mb-4 text-orie-text">결제 처리 중...</h1>
                    <p className="text-orie-text/60">잠시만 기다려주세요.</p>
                </div>
            </main>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
