"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

type DeliveryMethod = "quick" | "pickup";

interface DeliveryMethodSelectorProps {
    method: DeliveryMethod;
    setMethod: (method: DeliveryMethod) => void;
    date: Date | null;
    setDate: (date: Date | null) => void;
    time: string;
    setTime: (time: string) => void;
}

export function DeliveryMethodSelector({
    method,
    setMethod,
    date,
    setDate,
    time,
    setTime,
}: DeliveryMethodSelectorProps) {
    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-lg font-medium text-orie-text">배송 방법 선택</h3>

            <div className="flex gap-4">
                <button
                    onClick={() => setMethod("quick")}
                    className={`flex-1 py-4 border text-sm font-medium transition-colors ${method === "quick"
                            ? "border-orie-text bg-orie-text text-white"
                            : "border-orie-text/20 text-orie-text hover:border-orie-text"
                        }`}
                >
                    퀵서비스 (차량 배송)
                </button>
                <button
                    onClick={() => setMethod("pickup")}
                    className={`flex-1 py-4 border text-sm font-medium transition-colors ${method === "pickup"
                            ? "border-orie-text bg-orie-text text-white"
                            : "border-orie-text/20 text-orie-text hover:border-orie-text"
                        }`}
                >
                    직접 픽업 (매장 방문)
                </button>
            </div>

            <div className="bg-orie-bg-secondary p-6 rounded-sm">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-orie-text/80">
                            {method === "quick" ? "배송 희망일" : "픽업 예정일"}
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                            minDate={addDays(new Date(), 3)}
                            placeholderText="날짜를 선택해주세요"
                            className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text bg-white"
                            dateFormat="yyyy.MM.dd"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-orie-text/80">
                            {method === "quick" ? "배송 희망 시간" : "픽업 예정 시간"}
                        </label>
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-3 border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text bg-white"
                        >
                            <option value="">시간을 선택해주세요</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                        </select>
                    </div>

                    {method === "quick" && (
                        <div className="text-xs text-orie-text/60 mt-2">
                            * 퀵서비스 비용은 착불이며, 거리에 따라 요금이 상이합니다. (서울/경기 지역 가능)
                        </div>
                    )}
                    {method === "pickup" && (
                        <div className="text-xs text-orie-text/60 mt-2">
                            * 픽업 장소: 서울시 강남구 압구정로 123 ORIE 아틀리에
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
