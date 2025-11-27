"use client";

import { useState } from "react";

interface GuestOrderFormProps {
    onSubmit: (guestInfo: { name: string; phone: string; password: string }) => void;
    onCancel: () => void;
}

export function GuestOrderForm({ onSubmit, onCancel }: GuestOrderFormProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !password || !confirmPassword) {
            alert("모든 정보를 입력해주세요.");
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        onSubmit({ name, phone, password });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-serif mb-4 text-orie-text">비회원 주문 정보</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="주문자 성함"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">연락처</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="010-0000-0000"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">주문 조회 비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="비밀번호"
                        autoComplete="new-password"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">비밀번호 확인</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-orie-text"
                        placeholder="비밀번호 확인"
                        autoComplete="new-password"
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-3 border border-gray-300 text-gray-600 text-sm hover:bg-gray-50"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-3 bg-orie-text text-white text-sm font-semibold hover:opacity-90"
                    >
                        입력 완료
                    </button>
                </div>
            </form>
        </div>
    );
}
