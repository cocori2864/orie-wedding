import { Suspense } from "react";
import CheckoutCompleteContent from "./CheckoutCompleteContent";

export default function CheckoutCompletePage() {
    return (
        <Suspense fallback={
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[600px] mx-auto px-5 md:px-10 text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse" />
                        <div className="h-8 bg-gray-100 rounded mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded w-48 mx-auto animate-pulse" />
                    </div>
                </div>
            </main>
        }>
            <CheckoutCompleteContent />
        </Suspense>
    );
}
