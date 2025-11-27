"use client";

import { useState, useEffect } from "react";
import { Search, Mail, Phone, Calendar } from "lucide-react";
import { getCustomers } from "../actions/getCustomers";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const { data, error } = await getCustomers();

            if (error) throw error;
            setCustomers(data || []);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">고객 관리</h1>
                <div className="text-sm text-gray-500">
                    총 {customers.length}명
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="이름 또는 이메일 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                    />
                </div>
            </div>

            {/* Customer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-gray-500">고객 목록을 불러오는 중...</div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500">검색된 고객이 없습니다.</div>
                ) : (
                    filteredCustomers.map((customer) => (
                        <div key={customer.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{customer.name || '이름 없음'}</h3>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${customer.role === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {customer.role === 'admin' ? '관리자' : '일반 고객'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} />
                                    <span className="truncate">{customer.email}</span>
                                </div>
                                {customer.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} />
                                        <span>{customer.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>가입일: {new Date(customer.created_at).toLocaleDateString('ko-KR')}</span>
                                </div>
                            </div>


                        </div>
                    ))
                )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500">총 고객 수</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500">관리자 수</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {customers.filter(c => c.role === 'admin').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500">일반 고객 수</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {customers.filter(c => c.role !== 'admin').length}
                    </p>
                </div>
            </div>
        </div>
    );
}
