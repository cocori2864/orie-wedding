"use client";

import Image from "next/image";
import Link from "next/link";

export function GalleryItem({ product }: { product: any }) {
    return (
        <Link href={`/shop/${product.id}`} className="group relative block aspect-[3/4] overflow-hidden bg-gray-100">
            <Image
                src={product.image || product.image_url || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                unoptimized
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

            {/* Info (Hidden by default, shown on hover) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 text-center">
                <h3 className="text-white font-serif text-xl tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {product.name}
                </h3>
                <p className="text-white/90 text-sm font-light tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 px-4 break-keep">
                    {product.description
                        ? (product.description.length > 18 ? product.description.slice(0, 18) + "..." : product.description)
                        : "자세히 보기"}
                </p>
            </div>
        </Link>
    );
}
