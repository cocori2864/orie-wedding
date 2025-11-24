"use client";

import { useState } from "react";
import { Save, Building, Globe, CreditCard, Bell, Shield, Mail } from "lucide-react";

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = useState("general");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your store settings and preferences</p>
            </div>

            <div className="flex gap-8">
                {/* Settings Sidebar */}
                <div className="w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {[
                            { id: 'general', icon: Building, label: 'General' },
                            { id: 'store', icon: Globe, label: 'Store Details' },
                            { id: 'payments', icon: CreditCard, label: 'Payments' },
                            { id: 'notifications', icon: Bell, label: 'Notifications' },
                            { id: 'security', icon: Shield, label: 'Security' },
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
                                <h2 className="text-lg font-bold text-gray-900">General Settings</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Store Name</label>
                                    <input
                                        type="text"
                                        defaultValue="ORIÉ Wedding Bouquet"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Store Description</label>
                                    <textarea
                                        rows={4}
                                        defaultValue="Premium wedding bouquet e-commerce store"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Contact Email</label>
                                    <input
                                        type="email"
                                        defaultValue="contact@orie.com"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
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
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedTab === 'store' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">Store Details</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Business Address</label>
                                    <input
                                        type="text"
                                        placeholder="123 Wedding Street, Seoul"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            placeholder="Seoul"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Postal Code</label>
                                        <input
                                            type="text"
                                            placeholder="12345"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Business Hours</label>
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
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedTab === 'payments' && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {['Card Payment', 'Bank Transfer', 'KakaoPay', 'Naver Pay'].map((method, i) => (
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
                                <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {[
                                    { label: 'New Order Notifications', desc: 'Get notified when new orders are placed' },
                                    { label: 'Low Stock Alerts', desc: 'Receive alerts when products are low in stock' },
                                    { label: 'Customer Messages', desc: 'Get notified of new customer inquiries' },
                                    { label: 'Marketing Updates', desc: 'Receive updates about marketing performance' },
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
                                <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm text-gray-700">Enable two-factor authentication</span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end">
                                <button className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                                    <Save size={16} />
                                    Update Password
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
