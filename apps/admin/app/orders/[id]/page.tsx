"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Truck, XCircle, CheckCircle } from "lucide-react";

// Mock Data
const ORDER = {
    id: "ORD-2024-101",
    date: "2024-01-20 14:30",
    status: "Paid",
    customer: {
        name: "Hong Gildong",
        phone: "010-1234-5678",
        email: "hong@example.com",
    },
    delivery: {
        method: "Quick Service",
        date: "2024-01-27",
        time: "14:00",
        address: "Gangnam-gu, Seoul, 123-45",
        detailAddress: "3rd Floor, Wedding Hall",
        note: "Please handle with care.",
    },
    items: [
        {
            id: "1",
            name: "Classic Rose Bouquet",
            price: 180000,
            quantity: 1,
            options: ["Boutonniere (+15,000)"],
            image: "/images/bouquet_01.png", // Placeholder
        },
    ],
    payment: {
        method: "Credit Card",
        amount: 195000,
        shippingFee: 0, // Quick is paid on arrival
    },
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/orders" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{id}</h1>
                        <p className="text-sm text-gray-500">{ORDER.date}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {ORDER.status}
                    </span>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Printer size={16} />
                        Print Invoice
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800">
                        <Truck size={16} />
                        Ship Order
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Items & Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {ORDER.items.map((item) => (
                                <div key={item.id} className="p-6 flex gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {item.options.map((opt) => (
                                                <span key={opt} className="block">
                                                    • {opt}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">₩{item.price.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₩180,000</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Options</span>
                                <span className="font-medium">₩15,000</span>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">Pay on Arrival</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span>₩195,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Payment Method</p>
                                <p className="font-medium mt-1">{ORDER.payment.method}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Payment Date</p>
                                <p className="font-medium mt-1">{ORDER.date}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Delivery */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Customer</h2>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                HG
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{ORDER.customer.name}</p>
                                <p className="text-sm text-gray-500">First-time Customer</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <span>📧</span> {ORDER.customer.email}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <span>📞</span> {ORDER.customer.phone}
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Method</p>
                                <p className="text-sm font-medium mt-1">{ORDER.delivery.method}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Scheduled For</p>
                                <p className="text-sm font-medium mt-1 text-blue-600">
                                    {ORDER.delivery.date} at {ORDER.delivery.time}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Address</p>
                                <p className="text-sm mt-1 text-gray-700">
                                    {ORDER.delivery.address}
                                    <br />
                                    {ORDER.delivery.detailAddress}
                                </p>
                            </div>
                            {ORDER.delivery.note && (
                                <div className="bg-yellow-50 p-3 rounded-md">
                                    <p className="text-xs font-medium text-yellow-800 mb-1">Note</p>
                                    <p className="text-sm text-yellow-700">{ORDER.delivery.note}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full py-2 border border-red-200 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-2">
                                <XCircle size={16} />
                                Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
