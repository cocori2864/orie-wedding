"use client";

import { useCartStore } from "../../store/cartStore";

interface CartItemProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export function CartItem({ id, name, price, quantity, image }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <div className="flex gap-6 py-6 border-b border-orie-text/10">
            {/* Image */}
            <div className="w-24 h-32 bg-[#F0F0F0] flex-shrink-0 overflow-hidden">
                {image && (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium text-orie-text">{name}</h3>
                    <button
                        onClick={() => removeItem(id)}
                        className="text-orie-text/40 hover:text-orie-text text-sm"
                    >
                        삭제
                    </button>
                </div>

                <div className="flex justify-between items-end">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-orie-text/20">
                        <button
                            onClick={() => updateQuantity(id, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                        >
                            -
                        </button>
                        <span className="w-8 text-center text-sm">{quantity}</span>
                        <button
                            onClick={() => updateQuantity(id, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                        >
                            +
                        </button>
                    </div>

                    <div className="text-base font-medium text-orie-text">
                        ₩{(price * quantity).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
