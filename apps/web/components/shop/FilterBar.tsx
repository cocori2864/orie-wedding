"use client";

import { CATEGORIES, COLORS, STYLES } from "../../data/products";

interface FilterBarProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    selectedStyle: string;
    setSelectedStyle: (style: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

const SORT_OPTIONS = [
    { value: "featured", label: "추천순" },
    { value: "price-asc", label: "가격 낮은순" },
    { value: "price-desc", label: "가격 높은순" },
    { value: "name-asc", label: "이름순" },
];

export function FilterBar({
    selectedCategory,
    setSelectedCategory,
    selectedColor,
    setSelectedColor,
    selectedStyle,
    setSelectedStyle,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
}: FilterBarProps) {
    return (
        <div className="flex flex-col gap-6 mb-12 pb-6 border-b border-orie-text/10">
            {/* Top Row: Categories */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-sm pb-2 border-b-2 transition-colors ${selectedCategory === category
                                ? "text-orie-text border-orie-text"
                                : "text-orie-text/60 border-transparent hover:text-orie-text"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Bottom Row: Detailed Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Color Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-orie-text/60">Color:</span>
                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="px-3 py-2 border border-orie-text/20 bg-transparent text-sm text-orie-text focus:outline-none focus:border-orie-text"
                        >
                            {COLORS.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Style Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-orie-text/60">Style:</span>
                        <select
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="px-3 py-2 border border-orie-text/20 bg-transparent text-sm text-orie-text focus:outline-none focus:border-orie-text"
                        >
                            {STYLES.map((style) => (
                                <option key={style} value={style}>
                                    {style}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-orie-text/60">Price:</span>
                        <select
                            value={`${priceRange[0]}-${priceRange[1]}`}
                            onChange={(e) => {
                                const parts = e.target.value.split("-").map(Number);
                                setPriceRange([parts[0] ?? 0, parts[1] ?? 500000]);
                            }}
                            className="px-3 py-2 border border-orie-text/20 bg-transparent text-sm text-orie-text focus:outline-none focus:border-orie-text"
                        >
                            <option value="0-500000">전체 가격</option>
                            <option value="0-180000">18만원 이하</option>
                            <option value="180000-250000">18만원 ~ 25만원</option>
                            <option value="250000-500000">25만원 이상</option>
                        </select>
                    </div>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-orie-text/20 bg-transparent text-sm text-orie-text focus:outline-none focus:border-orie-text"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
