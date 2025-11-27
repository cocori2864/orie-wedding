"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { GalleryItem } from "./GalleryItem";
import { Suspense } from "react";

const CATEGORIES = [
    { id: 'all', label: 'ALL' },
    { id: 'simple', label: 'SIMPLE' },
    { id: 'premium', label: 'PREMIUM' },
    { id: 'custom', label: 'CUSTOM' },
    { id: 'etc', label: 'ETC' },
];

function GalleryContent({ products }: { products: any[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeCategory = searchParams.get('category') || 'all';

    const filteredProducts = products.filter(p => {
        if (activeCategory === 'all') return true;
        return p.category === activeCategory;
    });

    const handleCategoryClick = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (categoryId === 'all') {
            params.delete('category');
        } else {
            params.set('category', categoryId);
        }
        router.push(`/?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="w-full min-h-screen pt-32 pb-20 px-5 md:px-10">
            {/* Category Nav (Fixed Top Center - Sticky) */}
            <div className="sticky top-20 z-40 bg-orie-bg/95 backdrop-blur-sm py-6 mb-12 flex justify-center border-b border-orie-text/5">
                <nav className="flex gap-8 md:gap-12">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`text-sm tracking-[2px] transition-colors ${activeCategory === cat.id
                                ? "text-orie-text font-medium border-b border-orie-text pb-1"
                                : "text-orie-text/40 hover:text-orie-text/70"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 max-w-[1800px] mx-auto">
                {filteredProducts.map(product => (
                    <GalleryItem key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-32 text-orie-text/40 font-light">
                    <p className="mb-2">No works found in this category.</p>
                    <button onClick={() => handleCategoryClick('all')} className="text-xs underline">View All</button>
                </div>
            )}
        </div>
    );
}

export function GalleryMain({ products }: { products: any[] }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GalleryContent products={products} />
        </Suspense>
    );
}

