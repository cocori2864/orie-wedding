"use client";

import { useState } from "react";
import { Save, Building, Globe, CreditCard, Bell, Shield, Mail } from "lucide-react";

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = useState("general");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">설정</h1>
                <p className="text-gray-500 mt-1">스토어 설정 및 환경설정을 관리하세요.</p>
            </div>

            <div className="flex gap-8">
                {/* Settings Sidebar */}
                <div className="w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {[
                            { id: 'general', icon: Building, label: '일반' },
                            { id: 'store', icon: Globe, label: '스토어 정보' },
                            { id: 'payments', icon: CreditCard, label: '결제' },
                            { id: 'notifications', icon: Bell, label: '알림' },
                            { id: 'security', icon: Shield, label: '보안' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${selectedTab === item.id
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                    {selectedTab === 'general' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">일반 설정</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">스토어 이름</label>
                                    <input
                                        type="text"
                                        defaultValue="ORIÉ Wedding Bouquet"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">스토어 설명</label>
                                    <textarea
                                        rows={4}
                                        defaultValue="Premium wedding bouquet e-commerce store"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">연락처 이메일</label>
                                    <input
                                        type="email"
                                        defaultValue="contact@orie.com"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">전화번호</label>
                                    <input
                                        type="tel"
                                        defaultValue="+82 10-1234-5678"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end">
                                <button className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                                    <Save size={16} />
                                    변경사항 저장
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedTab === 'store' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">스토어 정보</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">사업장 주소</label>
                                    <input
                                        type="text"
                                        placeholder="123 Wedding Street, Seoul"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">도시</label>
                                        <input
                                            type="text"
                                            placeholder="Seoul"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">우편번호</label>
                                        <input
                                            type="text"
                                            placeholder="12345"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">영업 시간</label>
                                    <input
                                        type="text"
                                        defaultValue="Mon-Fri: 9:00 AM - 6:00 PM"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end">
                                <button className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                                    <Save size={16} />
                                    변경사항 저장
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedTab === 'payments' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">결제 수단</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {['카드 결제', '무통장 입금', '카카오페이', '네이버페이'].map((method, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CreditCard size={20} className="text-gray-400" />
                                            <span className="font-medium text-gray-900">{method}</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedTab === 'notifications' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">알림 설정</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {[
                                    { label: '새 주문 알림', desc: '새로운 주문이 접수되면 알림을 받습니다.' },
                                    { label: '재고 부족 알림', desc: '상품 재고가 부족할 때 알림을 받습니다.' },
                                    { label: '고객 문의 알림', desc: '새로운 고객 문의가 오면 알림을 받습니다.' },
                                    { label: '마케팅 업데이트', desc: '마케팅 성과에 대한 업데이트를 받습니다.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.label}</p>
                                            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedTab === 'security' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">보안 설정</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">현재 비밀번호</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">새 비밀번호</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">새 비밀번호 확인</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm text-gray-700">2단계 인증 활성화</span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end">
                                <button className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                                    <Save size={16} />
                                    비밀번호 변경
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
