"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export function OrderFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState(searchParams.get("search") || "");
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
        <div className="flex gap-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="주문번호, 고객명으로 검색..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-900"
                />
            </div>
            <select
                value={status}
                onChange={handleStatusChange}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-900"
            >
                <option value="">전체 상태</option>
                <option value="pending">결제 대기</option>
                <option value="paid">결제 완료</option>
                <option value="preparing">준비 중</option>
                <option value="shipped">배송 중</option>
                <option value="delivered">배송 완료</option>
                <option value="cancelled">취소됨</option>
            </select>
        </div>
    );
}
