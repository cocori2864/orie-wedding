"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ALL_PRODUCTS } from "../data/products";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(ALL_PRODUCTS);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (query.trim() === "") {
            setResults(ALL_PRODUCTS);
        } else {
            const filtered = ALL_PRODUCTS.filter(
                (p) =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.category.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        }
    }, [query]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="absolute top-0 left-0 right-0 bg-orie-bg">
                <div className="w-full max-w-[800px] mx-auto px-5 py-8">
                    <div className="flex items-center gap-4 mb-8">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-orie-text/40"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="부케 검색..."
                            className="flex-1 bg-transparent text-xl text-orie-text placeholder:text-orie-text/40 focus:outline-none"
                        />
                        <button
                            onClick={onClose}
                            className="text-orie-text/60 hover:text-orie-text"
                        >
                            <svg
                                width="24"
                                height="24"
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

                    <div className="border-t border-orie-text/10 pt-6">
                        {results.length === 0 ? (
                            <p className="text-center text-orie-text/60 py-8">
                                "{query}"에 대한 검색 결과가 없습니다
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {results.slice(0, 8).map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="group"
                                    >
                                        <div className="relative aspect-square bg-[#F0F0F0] mb-3 overflow-hidden group-hover:opacity-80 transition-opacity">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-xs text-orie-text/40 mb-1">
                                            {product.category}
                                        </p>
                                        <h3 className="text-sm font-medium text-orie-text">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-orie-text/80">
                                            ₩{product.price.toLocaleString()}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {query && results.length > 0 && (
                        <div className="mt-8 text-center">
                            <Link
                                href={`/shop?q=${encodeURIComponent(query)}`}
                                onClick={onClose}
                                className="text-sm text-orie-text hover:underline"
                            >
                                전체 {results.length}개 결과 보기 →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
