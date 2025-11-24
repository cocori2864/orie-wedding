"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function MyPageSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div className="w-full md:w-[200px] flex-shrink-0">
            <nav className="flex flex-row md:flex-col gap-4">
                <Link
                    href="/mypage"
                    className={`text-sm pb-2 border-b-2 ${isActive("/mypage")
                            ? "text-orie-text font-medium border-orie-text"
                            : "text-orie-text/60 hover:text-orie-text border-transparent"
                        }`}
                >
                    주문 내역
                </Link>
                <Link
                    href="/mypage/profile"
                    className={`text-sm pb-2 border-b-2 ${isActive("/mypage/profile")
                            ? "text-orie-text font-medium border-orie-text"
                            : "text-orie-text/60 hover:text-orie-text border-transparent"
                        }`}
                >
                    회원 정보
                </Link>
                <Link
                    href="/mypage/address"
                    className={`text-sm pb-2 border-b-2 ${isActive("/mypage/address")
                            ? "text-orie-text font-medium border-orie-text"
                            : "text-orie-text/60 hover:text-orie-text border-transparent"
                        }`}
                >
                    배송지 관리
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-sm text-orie-text/60 hover:text-orie-text text-left pb-2 border-b-2 border-transparent"
                >
                    로그아웃
                </button>
            </nav>
        </div>
    );
}
