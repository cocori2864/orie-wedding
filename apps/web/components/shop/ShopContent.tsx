"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { FilterBar } from "./FilterBar";
import { CATEGORIES, COLORS, STYLES } from "../../data/products";

interface ShopContentProps {
    initialProducts: any[];
}

export function ShopContent({ initialProducts }: ShopContentProps) {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get("q") || "";

    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [selectedColor, setSelectedColor] = useState("전체");
    const [selectedStyle, setSelectedStyle] = useState("전체");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
    const [sortBy, setSortBy] = useState("newest");

    const filteredProducts = useMemo(() => {
        let products = [...initialProducts];

        if (queryParam) {
            products = products.filter((p) =>
                p.name.toLowerCase().includes(queryParam.toLowerCase())
            );
        }

        if (selectedCategory !== "전체") {
            products = products.filter((p) => p.category === selectedCategory);
        }

        if (selectedColor !== "전체") {
            products = products.filter((p) => p.color === selectedColor);
        }

        if (selectedStyle !== "전체") {
            products = products.filter((p) => p.style === selectedStyle);
        }

        products = products.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        if (sortBy === "price_asc") {
            products.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price_desc") {
            products.sort((a, b) => b.price - a.price);
        }

        return products;
    }, [selectedCategory, selectedColor, selectedStyle, priceRange, sortBy, queryParam, initialProducts]);

    return (
        <>
            <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-orie-text/60">
                    조건에 맞는 상품이 없습니다.
                </div>
            )}
        </>
    );
}
