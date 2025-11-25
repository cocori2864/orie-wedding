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
                    {/* Left: Navigation */}
                    <nav className="flex items-center gap-6 z-10">
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
                    </nav>

                    {/* Center: Logo */}
                    <Link href="/" className="no-underline absolute left-1/2 transform -translate-x-1/2">
                        <span className="font-serif text-2xl font-bold tracking-[2px] text-orie-text">
                            ORIÉ
                        </span>
                    </Link>

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
