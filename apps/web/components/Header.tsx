"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { SearchModal } from "./SearchModal";
import { MobileMenu } from "./MobileMenu";
import { createClient } from "../lib/supabase/client";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { getItemCount } = useCartStore();
    const { items: wishlistItems } = useWishlistStore();
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);

        // Check auth status
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsAuthenticated(!!user);
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, [supabase]);

    const cartCount = mounted ? getItemCount() : 0;
    const wishlistCount = mounted ? wishlistItems.length : 0;

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full h-20 z-50 flex justify-center items-center transition-all duration-300 ${isScrolled
                    ? "bg-orie-bg/95 backdrop-blur-md border-b border-orie-text/10"
                    : "bg-transparent"
                    }`}
            >
                <div className="w-full max-w-[1600px] px-5 md:px-10 flex justify-between items-center">
                    {/* Left: Navigation */}
                    <nav className="flex items-center gap-6">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="text-orie-text hover:opacity-70 transition-opacity md:hidden"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <Link
                            href="/shop"
                            className="hidden md:block text-sm text-orie-text hover:opacity-70 transition-opacity"
                        >
                            부케 보기
                        </Link>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:block text-sm text-orie-text hover:opacity-70 transition-opacity"
                        >
                            검색
                        </button>
                    </nav>

                    {/* Center: Logo */}
                    <Link href="/" className="no-underline">
                        <span className="font-serif text-2xl font-bold tracking-[2px] text-orie-text">
                            ORIÉ
                        </span>
                    </Link>

                    {/* Right: Utility Icons */}
                    <nav className="flex gap-4 md:gap-6 items-center">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="md:hidden text-orie-text hover:opacity-70 transition-opacity"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>

                        <Link
                            href="/wishlist"
                            className="hidden md:block text-orie-text hover:opacity-70 transition-opacity relative"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orie-text text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href={mounted && isAuthenticated ? "/mypage" : "/login"}
                            className="text-orie-text hover:opacity-70 transition-opacity"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </Link>

                        <Link href="/cart" className="text-orie-text hover:opacity-70 transition-opacity relative">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orie-text text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </header>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
