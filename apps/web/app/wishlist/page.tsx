"use client";

import Link from "next/link";
import { useWishlistStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/cartStore";

export default function WishlistPage() {
    const { items, removeItem } = useWishlistStore();
    const { addItem } = useCartStore();

    const handleAddToCart = (item: typeof items[0]) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
        });
        removeItem(item.id);
    };

    if (items.length === 0) {
        return (
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 text-center">
                    <h1 className="text-3xl font-light mb-8 text-orie-text">찜 목록</h1>
                    <p className="text-orie-text/60 mb-8">찜한 상품이 없습니다</p>
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-3 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                    >
                        부케 구경하기
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-16 text-orie-text">
                    찜 목록 ({items.length})
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {items.map((item) => (
                        <div key={item.id} className="group relative">
                            <Link href={`/product/${item.id}`}>
                                <div className="aspect-[3/4] bg-[#F0F0F0] mb-4 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 group-hover:scale-105 transition-transform duration-500" />
                                    )}
                                </div>
                                <h3 className="text-sm font-medium text-orie-text mb-1">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-orie-text/80">
                                    ₩{item.price.toLocaleString()}
                                </p>
                            </Link>

                            {/* Actions */}
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="flex-1 py-2 bg-orie-text text-white text-xs font-semibold hover:bg-[#5A6275] transition-colors"
                                >
                                    장바구니 담기
                                </button>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 border border-orie-text/20 text-orie-text/60 hover:text-orie-text hover:border-orie-text transition-colors"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
