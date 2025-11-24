"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeliveryMethodSelector } from "../../components/checkout/DeliveryMethodSelector";
import { useCartStore } from "../../store/cartStore";
import { createClient } from "../../lib/supabase/client";
import { createOrder } from "../../lib/services/orders";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getSubtotal, clearCart } = useCartStore();
    const supabase = createClient();

    const [deliveryMethod, setDeliveryMethod] = useState<"quick" | "pickup">("quick");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const subtotal = getSubtotal();
    const shippingFee = deliveryMethod === "quick" ? "착불" : 0;

    const handleTossPayment = async () => {
        // Validation
        if (!name || !phone) {
            alert("이름과 연락처를 입력해주세요.");
            return;
        }

        if (!date || !time) {
            alert("배송/픽업 날짜와 시간을 선택해주세요.");
            return;
        }

        if (deliveryMethod === "quick" && !address) {
            alert("배송 주소를 입력해주세요.");
            return;
        }

        setLoading(true);

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();

            // Prepare order data
            const orderData = {
                userId: user?.id,
                guestInfo: !user ? { name, email, phone } : undefined,
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    options: (item as any).options || null,
                })),
                totalAmount: subtotal,
                deliveryMethod,
                deliveryInfo: {
                    date: date!.toISOString().split('T')[0],
                    time,
                    address: deliveryMethod === "quick" ? address : undefined,
                    detailAddress: deliveryMethod === "quick" ? detailAddress : undefined,
                    note,
                },
                paymentMethod: "toss_card",
            };

            // Create order first (status: pending)
            const result = await createOrder(orderData);

            if (result.success) {
                // Store order ID for payment success callback
                sessionStorage.setItem('pendingOrderId', result.orderId!);

                // Initiate Toss Payment
                const { loadTossPayments } = await import("@tosspayments/payment-sdk");
                const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
                const tossPayments = await loadTossPayments(clientKey);

                await tossPayments.requestPayment({
                    method: "CARD",
                    amount: subtotal,
                    orderId: result.orderId || "",
                    orderName: items.length > 1 ? `${items[0].name} 외 ${items.length - 1}건` : items[0].name,
                    successUrl: `${window.location.origin}/payment/success`,
                    failUrl: `${window.location.origin}/payment/fail`,
                    customerEmail: email || user?.email || "",
                    customerName: name,
                });
            } else {
                alert(`주문 생성 실패: ${result.error}`);
                setLoading(false);
            }
        } catch (error: any) {
            console.error("Checkout error:", error);
            alert("결제 처리 중 오류가 발생했습니다.");
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10 text-center">
                    <h1 className="text-3xl font-light mb-8 text-orie-text">장바구니가 비어있습니다</h1>
                    <button
                        onClick={() => router.push("/shop")}
                        className="px-8 py-3 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                    >
                        쇼핑 계속하기
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-16 text-orie-text">Checkout</h1>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Left: Order Form */}
                    <div className="flex-1 flex flex-col gap-12">
                        {/* 1. Customer Info */}
                        <section>
                            <h2 className="text-xl font-medium text-orie-text mb-6 pb-4 border-b border-orie-text/10">
                                주문자 정보
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-orie-text/80">이름</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="p-3 border border-orie-text/20 text-sm"
                                        placeholder="홍길동"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-orie-text/80">연락처</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="p-3 border border-orie-text/20 text-sm"
                                        placeholder="010-0000-0000"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm text-orie-text/80">이메일 (선택)</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="p-3 border border-orie-text/20 text-sm"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 2. Delivery Method */}
                        <section>
                            <h2 className="text-xl font-medium text-orie-text mb-6 pb-4 border-b border-orie-text/10">
                                배송/픽업 선택
                            </h2>
                            <DeliveryMethodSelector
                                method={deliveryMethod}
                                setMethod={setDeliveryMethod}
                                date={date}
                                setDate={setDate}
                                time={time}
                                setTime={setTime}
                            />
                        </section>

                        {/* 3. Address (Only for Quick) */}
                        {deliveryMethod === "quick" && (
                            <section>
                                <h2 className="text-xl font-medium text-orie-text mb-6 pb-4 border-b border-orie-text/10">
                                    배송지 정보
                                </h2>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-orie-text/80">주소</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="p-3 border border-orie-text/20 text-sm"
                                            placeholder="서울시 강남구 테헤란로 123"
                                        />
                                        <input
                                            type="text"
                                            value={detailAddress}
                                            onChange={(e) => setDetailAddress(e.target.value)}
                                            className="p-3 border border-orie-text/20 text-sm"
                                            placeholder="상세 주소 (예: 3층 웨딩홀)"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-orie-text/80">배송 요청사항 (선택)</label>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            className="p-3 border border-orie-text/20 text-sm"
                                            rows={3}
                                            placeholder="배송 시 요청사항을 입력해주세요"
                                        />
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="w-full md:w-[350px]">
                        <div className="bg-orie-bg-secondary p-8 sticky top-24">
                            <h2 className="text-lg font-medium mb-6 text-orie-text">주문 상품</h2>

                            <div className="flex flex-col gap-3 mb-6 border-b border-orie-text/10 pb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-orie-text">{item.name} × {item.quantity}</span>
                                        <span className="text-orie-text/60">₩{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 mb-8 border-b border-orie-text/10 pb-8">
                                <div className="flex justify-between text-sm text-orie-text/80">
                                    <span>상품 금액</span>
                                    <span>₩{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-orie-text/80">
                                    <span>배송비</span>
                                    <span>{typeof shippingFee === 'string' ? shippingFee : `₩${shippingFee.toLocaleString()}`}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-medium text-orie-text mb-8">
                                <span>총 결제금액</span>
                                <span>₩{subtotal.toLocaleString()}</span>
                            </div>

                            <button
                                onClick={handleTossPayment}
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 rounded-md mb-3"
                            >
                                {loading ? "처리 중..." : "토스페이먼츠로 결제하기"}
                            </button>

                            <p className="text-xs text-center text-orie-text/60">
                                테스트 결제입니다. 실제 금액이 청구되지 않습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
