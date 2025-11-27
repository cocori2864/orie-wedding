"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { createClient } from "../../lib/supabase/client";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full h-20 z-50 flex justify-center items-center transition-all duration-300 ${isScrolled
                    ? "bg-orie-bg/95 backdrop-blur-md border-b border-orie-text/10"
                    : "bg-transparent"
                    }`}
            >
                <div className="w-full max-w-[1600px] px-5 md:px-10 flex justify-between items-center relative">
                    {/* Left: Mobile Navigation */}
                    <nav className="flex items-center gap-6 z-10 md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
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
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </nav>

                    {/* Logo - Mobile: Center, Desktop: Left */}
                    <Link href="/" className="no-underline absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:mr-auto z-20">
                        <span className="font-serif text-2xl font-bold tracking-[2px] text-orie-text">
                            ORIÉ
                        </span>
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 z-10">
                        <Link href="/about" className="text-xs tracking-[2px] hover:opacity-50 transition-opacity">ABOUT</Link>

                        <div className="relative group">
                            <Link href="/?category=all" className="text-xs tracking-[2px] hover:opacity-50 transition-opacity py-6 block">WORKS</Link>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block">
                                <div className="bg-white/95 backdrop-blur-sm border border-orie-text/10 py-3 px-6 flex flex-col gap-3 min-w-[140px] text-center shadow-sm">
                                    <Link href="/?category=all" className="text-[10px] tracking-[2px] hover:opacity-50 transition-opacity">ALL</Link>
                                    <Link href="/?category=simple" className="text-[10px] tracking-[2px] hover:opacity-50 transition-opacity">SIMPLE</Link>
                                    <Link href="/?category=premium" className="text-[10px] tracking-[2px] hover:opacity-50 transition-opacity">PREMIUM</Link>
                                    <Link href="/?category=custom" className="text-[10px] tracking-[2px] hover:opacity-50 transition-opacity">CUSTOM</Link>
                                    <Link href="/?category=etc" className="text-[10px] tracking-[2px] hover:opacity-50 transition-opacity">ETC</Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/price" className="text-xs tracking-[2px] hover:opacity-50 transition-opacity">PRICE</Link>
                        <Link href="/reservation" className="text-xs tracking-[2px] hover:opacity-50 transition-opacity">RESERVATION</Link>
                        <Link href="/mypage" className="text-xs tracking-[2px] hover:opacity-50 transition-opacity">MY PAGE</Link>
                    </nav>

                    {/* Right: Utility Icons */}
                    <nav className="flex gap-4 md:gap-6 items-center z-10">
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
                    </nav>
                </div>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
