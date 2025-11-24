"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] md:hidden">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="absolute top-0 left-0 bottom-0 w-[300px] bg-orie-bg">
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-5 border-b border-orie-text/10">
                        <span className="font-serif text-xl font-bold text-orie-text">
                            ORIÉ
                        </span>
                        <button
                            onClick={onClose}
                            className="text-orie-text hover:opacity-70"
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

                    <nav className="flex-1 p-5">
                        <ul className="flex flex-col gap-6">
                            <li>
                                <Link
                                    href="/"
                                    onClick={onClose}
                                    className="text-lg text-orie-text hover:opacity-70"
                                >
                                    홈
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop"
                                    onClick={onClose}
                                    className="text-lg text-orie-text hover:opacity-70"
                                >
                                    부케 보기
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/wishlist"
                                    onClick={onClose}
                                    className="text-lg text-orie-text hover:opacity-70"
                                >
                                    찜 목록
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="text-lg text-orie-text hover:opacity-70"
                                >
                                    장바구니
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="p-5 border-t border-orie-text/10">
                        {isAuthenticated ? (
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/mypage"
                                    onClick={onClose}
                                    className="text-sm text-orie-text hover:opacity-70"
                                >
                                    마이페이지
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-orie-text/60 hover:text-orie-text text-left"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="block w-full py-3 bg-orie-text text-white text-sm font-semibold text-center"
                            >
                                로그인
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
