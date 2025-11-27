"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { getBlockedDates, getFullDates } from "../../app/actions/getAvailableDates";

interface BouquetOptionsProps {
    weddingDate: Date | null;
    setWeddingDate: (date: Date | null) => void;
    weddingTime: string;
    setWeddingTime: (time: string) => void;
    venue: string;
    setVenue: (venue: string) => void;
    pickupLocation: string;
    setPickupLocation: (location: string) => void;
    corsageCount: number;
    setCorsageCount: (count: number) => void;
    requests: string;
    setRequests: (requests: string) => void;
    quantity: number;
    setQuantity: (quantity: number) => void;
}

export function BouquetOptions({
    weddingDate,
    setWeddingDate,
    weddingTime,
    setWeddingTime,
    venue,
    setVenue,
    pickupLocation,
    setPickupLocation,
    corsageCount,
    setCorsageCount,
    requests,
    setRequests,
    quantity,
    setQuantity
}: BouquetOptionsProps) {
    const [blockedDates, setBlockedDates] = useState<Date[]>([]);
    const [fullDates, setFullDates] = useState<Date[]>([]);
    const [isLoadingDates, setIsLoadingDates] = useState(true);

    useEffect(() => {
        const fetchUnavailableDates = async () => {
            setIsLoadingDates(true);
            try {
                // Fetch blocked dates (max_slots = 0)
                const blockedResult = await getBlockedDates();
                if (blockedResult.success && blockedResult.data) {
                    const dates = blockedResult.data.map((item: any) => new Date(item.date + 'T00:00:00'));
                    setBlockedDates(dates);
                    console.log('[BouquetOptions] Blocked dates loaded:', dates.map(d => d.toISOString().split('T')[0]));
                }

                // Fetch full dates (reservations >= max_slots)
                const fullResult = await getFullDates();
                if (fullResult.success && fullResult.data) {
                    const dates = fullResult.data.map((dateStr: string) => new Date(dateStr + 'T00:00:00'));
                    setFullDates(dates);
                    console.log('[BouquetOptions] Full dates loaded:', dates.map(d => d.toISOString().split('T')[0]));
                }
            } catch (error) {
                console.error('[BouquetOptions] Error loading unavailable dates:', error);
            } finally {
                setIsLoadingDates(false);
            }
        };

        fetchUnavailableDates();
    }, []);

    const isDateUnavailable = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];

        // Check if date is in blocked list
        const isBlocked = blockedDates.some(blockedDate =>
            blockedDate.toISOString().split('T')[0] === dateStr
        );

        // Check if date is in full list
        const isFull = fullDates.some(fullDate =>
            fullDate.toISOString().split('T')[0] === dateStr
        );

        return isBlocked || isFull;
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-orie-text/80">수량</label>
                <div className="flex items-center gap-6 border border-orie-text/20 p-3 w-full bg-white">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        -
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Wedding Date */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-orie-text/80">예식일 (배송 희망일)</label>
                <DatePicker
                    selected={weddingDate}
                    onChange={(date) => setWeddingDate(date)}
                    minDate={addDays(new Date(), 7)} // Minimum 7 days lead time
                    filterDate={(date) => !isDateUnavailable(date)}
                    placeholderText="날짜를 선택해주세요"
                    className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text"
                    dateFormat="yyyy.MM.dd"
                />
                <p className="text-xs text-orie-text/40">* 최소 7일 전 예약이 필요합니다. 예약 불가 날짜는 선택할 수 없습니다.</p>
            </div>

            {/* Wedding Time */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-orie-text/80">예식 시간</label>
                <select
                    value={weddingTime}
                    onChange={(e) => setWeddingTime(e.target.value)}
                    className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text bg-white"
                >
                    <option value="">시간을 선택해주세요</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                </select>
            </div>

            {/* Venue */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-orie-text/80">예식 장소 (홀 이름 포함)</label>
                <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="예: 강남 더채플앳청담 3층 커티지홀"
                    className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text"
                />
            </div>

            {/* Pickup Location */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-orie-text/80">수령 장소 (메이크업 샵 등)</label>
                <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="OO샵, 서울시 강남구 도산대로 등"
                    className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text"
                />
            </div>

            {/* Additional Options (Moved to Modal) */}
            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-orie-text/10">
                <label className="text-sm text-orie-text/80 font-medium">구성품 옵션</label>

                {/* Boutonniere (Default) */}
                <div className="flex justify-between items-center p-3 bg-gray-50 border border-orie-text/10">
                    <span className="text-sm text-orie-text">신랑 부토니에</span>
                    <span className="text-sm text-orie-text/60">기본 포함 (Basic)</span>
                </div>

                {/* Corsage Selection */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-orie-text">혼주 코사지 추가</span>
                        <span className="text-xs text-orie-text/60">(개당 +15,000원)</span>
                    </div>
                    <select
                        value={corsageCount}
                        onChange={(e) => setCorsageCount(Number(e.target.value))}
                        className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text bg-white"
                    >
                        {[0, 1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>
                                {num === 0 ? "선택 안함" : `${num}개 (+${(num * 15000).toLocaleString()}원)`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Other Requests */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-orie-text/10">
                <label className="text-sm text-orie-text/80 font-medium">기타 요청사항</label>
                <textarea
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="특별히 요청하실 사항이 있다면 적어주세요."
                    className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text min-h-[100px] resize-none"
                />
            </div>
        </div>
    );
}
