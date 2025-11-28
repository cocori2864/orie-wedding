"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getMonthlyCapacity, manageCapacity, getMonthlyOrders } from "../actions/manageCapacity";

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [capacities, setCapacities] = useState<Record<string, number>>({});
    const [orders, setOrders] = useState<Record<string, any[]>>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [limitInput, setLimitInput] = useState("");
    const [loading, setLoading] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    useEffect(() => {
        fetchData();
    }, [year, month]);

    const fetchData = async () => {
        const [capacityResult, ordersResult] = await Promise.all([
            getMonthlyCapacity(year, month),
            getMonthlyOrders(year, month)
        ]);

        if (capacityResult.success && capacityResult.data) {
            const capMap: Record<string, number> = {};
            capacityResult.data.forEach((item: any) => {
                capMap[item.date] = item.max_slots;
            });
            setCapacities(capMap);
        }

        if (ordersResult.success && ordersResult.data) {
            const orderMap: Record<string, any[]> = {};
            ordersResult.data.forEach((order: any) => {
                const date = order.wedding_date;
                if (!orderMap[date]) orderMap[date] = [];
                orderMap[date].push(order);
            });
            setOrders(orderMap);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 2, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month, 1));
    };

    const handleDateClick = (day: number) => {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
        const currentLimit = capacities[dateStr];
        setLimitInput(currentLimit !== undefined ? String(currentLimit) : "");
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedDate) return;
        setLoading(true);

        const limit = limitInput.trim() === "" ? null : parseInt(limitInput);

        if (limit !== null && (isNaN(limit) || limit < 0)) {
            alert("유효한 숫자를 입력해주세요 (0 이상).");
            setLoading(false);
            return;
        }

        const result = await manageCapacity(selectedDate, limit);
        if (result.success) {
            setModalOpen(false);
            fetchData();
        } else {
            alert("저장 실패: " + result.error);
        }
        setLoading(false);
    };

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 = Sunday

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">예약 슬롯 관리</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-lg font-medium">
                        {year}년 {month}월
                    </span>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="grid grid-cols-7 gap-4 text-center mb-4">
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                        <div key={day} className="text-sm font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-4">
                    {days.map((day, idx) => {
                        if (day === null) return <div key={`empty-${idx}`} />;

                        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const limit = capacities[dateStr];
                        const dayOrders = orders[dateStr] || [];
                        const isBlocked = limit === 0;
                        const hasLimit = limit !== undefined;
                        const isFull = hasLimit && !isBlocked && dayOrders.length >= limit;

                        return (
                            <button
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className={`
                                    min-h-[120px] rounded-lg border p-2 flex flex-col items-start justify-between transition-colors relative overflow-hidden
                                    ${isBlocked
                                        ? 'bg-red-50 border-red-200 hover:bg-red-100'
                                        : isFull
                                            ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                                            : hasLimit
                                                ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                                                : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm'
                                    }
                                `}
                            >
                                <div className="flex justify-between w-full mb-2">
                                    <span className={`text-sm font-medium ${isBlocked ? 'text-red-700' : 'text-gray-700'}`}>
                                        {day}
                                    </span>
                                    {dayOrders.length > 0 && (
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                                            {dayOrders.length}건
                                        </span>
                                    )}
                                </div>

                                <div className="w-full space-y-1 overflow-y-auto max-h-[60px] text-left">
                                    {dayOrders.map((order, i) => (
                                        <div key={i} className="text-[10px] text-gray-600 truncate bg-white/50 px-1 rounded">
                                            {order.customer_name || order.guest_info?.name || "Guest"}
                                        </div>
                                    ))}
                                </div>

                                <div className="self-end mt-2">
                                    {isBlocked ? (
                                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                            불가
                                        </span>
                                    ) : hasLimit ? (
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${isFull ? 'text-orange-700 bg-orange-100' : 'text-yellow-700 bg-yellow-100'}`}>
                                            {dayOrders.length}/{limit}
                                        </span>
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            무제한
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">
                                {selectedDate} 설정
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    최대 예약 가능 수
                                </label>
                                <input
                                    type="number"
                                    value={limitInput}
                                    onChange={(e) => setLimitInput(e.target.value)}
                                    placeholder="비워두면 무제한"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    * 0을 입력하면 예약이 차단됩니다.<br />
                                    * 값을 비우면 무제한으로 설정됩니다.
                                </p>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "저장 중..." : "저장"}
                                </button>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
