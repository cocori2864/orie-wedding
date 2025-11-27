"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    Megaphone,
    Calendar,
    Settings,
    LogOut
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "대시보드", href: "/" },
    { icon: ShoppingBag, label: "주문 관리", href: "/orders" },
    { icon: Calendar, label: "예약 슬롯 관리", href: "/calendar" },
    { icon: Package, label: "상품 관리", href: "/products" },
    { icon: Users, label: "고객 관리", href: "/customers" },
    { icon: Megaphone, label: "마케팅", href: "/marketing" },
    { icon: Settings, label: "설정", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <span className="font-serif text-xl font-bold tracking-widest text-gray-900">
                    ORIÉ ADMIN
                </span>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 w-full transition-colors">
                    <LogOut size={20} />
                    로그아웃
                </button>
            </div>
        </aside >
    );
}
