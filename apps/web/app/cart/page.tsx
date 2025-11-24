"use client";

import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../components/cart/CartItem";
import { CartSummary } from "../../components/cart/CartSummary";
import Link from "next/link";

export default function CartPage() {
    const { items, getSubtotal } = useCartStore();
    const subtotal = getSubtotal();

    if (items.length === 0) {
        return (
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 text-center">
                    <h1 className="text-3xl font-light mb-8 text-orie-text">장바구니</h1>
                    <p className="text-orie-text/60 mb-8">장바구니가 비어있습니다</p>
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-3 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                    >
                        쇼핑 계속하기
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-16 text-orie-text">장바구니</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items List */}
                    <div className="flex-1">
                        <div className="border-t border-orie-text/10">
                            {items.map((item) => (
                                <CartItem key={item.id} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full lg:w-[400px]">
                        <CartSummary subtotal={subtotal} />
                    </div>
                </div>
            </div>
        </main>
    );
}
