"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";

import { BouquetOptions } from "./BouquetOptions";

interface ProductInfoProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    category?: string;
    flowers?: string;
}

export function ProductInfo({ id, name, price, description, image, category, flowers }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { addItem } = useCartStore();
    const { isInWishlist, toggleItem } = useWishlistStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const inWishlist = mounted ? isInWishlist(id) : false;

    const handleAddToCart = () => {
        addItem({ id, name, price, image }, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/cart");
    };

    const handleToggleWishlist = () => {
        toggleItem({ id, name, price, image });
    };

    return (
        <div className="w-full md:w-1/2 md:pl-20 md:sticky md:top-24 h-fit">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <p className="text-xs text-orie-text/60 mb-2 uppercase tracking-wider">{category || "웨딩 부케"}</p>
                    <h1 className="text-3xl font-serif font-normal text-orie-text mb-2">{name}</h1>
                    <p className="text-orie-text/60 text-sm">{flowers}</p>
                </div>
                <button
                    onClick={handleToggleWishlist}
                    className="p-2 hover:opacity-70 transition-opacity"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={inWishlist ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={inWishlist ? "text-red-500" : "text-orie-text"}
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>

            <div className="text-xl font-medium text-orie-text mb-10">₩{price.toLocaleString()}</div>

            <div className="border-t border-b border-orie-text/10 py-6 mb-10">
                <p className="text-sm text-orie-text/80 leading-relaxed">{description}</p>
            </div>

            <BouquetOptions />

            <div className="flex flex-col gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between border border-orie-text/20 p-4">
                    <span className="text-sm">수량</span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center hover:opacity-50"
                        >
                            -
                        </button>
                        <span className="text-sm w-4 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:opacity-50"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 text-sm font-semibold transition-colors ${isAdded
                        ? "bg-green-600 text-white"
                        : "bg-orie-text text-white hover:bg-[#5A6275]"
                        }`}
                >
                    {isAdded ? "장바구니에 담겼습니다 ✓" : "장바구니 담기"}
                </button>
                <button
                    onClick={handleBuyNow}
                    className="w-full py-4 border border-orie-text text-orie-text text-sm font-semibold hover:bg-orie-text hover:text-white transition-colors"
                >
                    바로 구매
                </button>
            </div>

            {/* Accordions (Placeholder) */}
            <div className="mt-12 flex flex-col gap-4">
                <div className="flex justify-between items-center py-2 border-b border-orie-text/10 cursor-pointer">
                    <span className="text-sm font-medium">상세 정보</span>
                    <span>+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-orie-text/10 cursor-pointer">
                    <span className="text-sm font-medium">사용된 꽃</span>
                    <span>+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-orie-text/10 cursor-pointer">
                    <span className="text-sm font-medium">배송 및 교환</span>
                    <span>+</span>
                </div>
            </div>
        </div>
    );
}
