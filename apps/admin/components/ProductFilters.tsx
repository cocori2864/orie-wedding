"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [status, setStatus] = useState(searchParams.get("status") || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (text) {
                params.set("search", text);
            } else {
                params.delete("search");
            }
            router.push(`?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [text, router, searchParams]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        const params = new URLSearchParams(searchParams.toString());
        if (newCategory) {
            params.set("category", newCategory);
        } else {
            params.delete("category");
        }
        router.push(`?${params.toString()}`);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        const params = new URLSearchParams(searchParams.toString());
        if (newStatus) {
            params.set("status", newStatus);
        } else {
            params.delete("status");
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="상품 검색..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                />
            </div>
            <div className="flex gap-2">
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                >
                    <option value="">전체 카테고리</option>
                    <option value="Classic">Classic</option>
                    <option value="Natural">Natural</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Premium">Premium</option>
                </select>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                >
                    <option value="">전체 상태</option>
                    <option value="active">판매중</option>
                    <option value="out_of_stock">품절</option>
                    <option value="archived">보관됨</option>
                </select>
            </div>
        </div>
    );
}
