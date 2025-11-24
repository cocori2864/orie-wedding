"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

export function BouquetOptions() {
    const [weddingDate, setWeddingDate] = useState<Date | null>(null);
    const [weddingTime, setWeddingTime] = useState("");
    const [venue, setVenue] = useState("");
    const [addBoutonniere, setAddBoutonniere] = useState(false);
    const [addCorsage, setAddCorsage] = useState(false);

    return (
        <div className="flex flex-col gap-6 border-t border-b border-orie-text/10 py-8 my-8">
            <h3 className="text-lg font-medium text-orie-text">예식 정보 입력 (필수)</h3>

            {/* Wedding Date */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-orie-text/80">예식일 (배송 희망일)</label>
                <DatePicker
                    selected={weddingDate}
                    onChange={(date) => setWeddingDate(date)}
                    minDate={addDays(new Date(), 7)} // Minimum 7 days lead time
                    placeholderText="날짜를 선택해주세요"
                    className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text"
                    dateFormat="yyyy.MM.dd"
                />
                <p className="text-xs text-orie-text/40">* 최소 7일 전 예약이 필요합니다.</p>
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

            {/* Additional Options */}
            <div className="flex flex-col gap-3 mt-4">
                <label className="text-sm text-orie-text/80 font-medium">추가 구성품</label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={addBoutonniere}
                        onChange={(e) => setAddBoutonniere(e.target.checked)}
                        className="w-4 h-4 accent-orie-text"
                    />
                    <span className="text-sm text-orie-text">신랑 부토니에 추가 (+15,000원)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={addCorsage}
                        onChange={(e) => setAddCorsage(e.target.checked)}
                        className="w-4 h-4 accent-orie-text"
                    />
                    <span className="text-sm text-orie-text">혼주 코사지 (4개) 추가 (+60,000원)</span>
                </label>
            </div>
        </div>
    );
}
