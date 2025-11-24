"use client";

import Link from "next/link";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        category: string;
        image: string;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0F0] mb-4">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        console.error('Failed to load image:', product.image);
                    }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            <div className="space-y-1 text-center">
                <p className="text-xs text-orie-text/60 uppercase tracking-wider">{product.category}</p>
                <h3 className="text-sm font-medium text-orie-text group-hover:text-black transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-orie-text/80">₩{product.price.toLocaleString()}</p>
            </div>
        </Link>
    );
}
