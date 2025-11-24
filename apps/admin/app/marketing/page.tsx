"use client";

import { useState } from "react";
import { Send, Mail, MessageSquare, Target, TrendingUp, Users } from "lucide-react";

export default function MarketingPage() {
    const [selectedTab, setSelectedTab] = useState("overview");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
                <p className="text-gray-500 mt-1">Manage campaigns and customer engagement</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'campaigns', label: 'Campaigns' },
                        { id: 'email', label: 'Email Marketing' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === tab.id
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {selectedTab === 'overview' && (
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Mail size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Sent</p>
                                    <p className="text-xl font-bold text-gray-900">1,234</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Target size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Open Rate</p>
                                    <p className="text-xl font-bold text-gray-900">45.6%</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <TrendingUp size={20} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Click Rate</p>
                                    <p className="text-xl font-bold text-gray-900">12.8%</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                    <Users size={20} className="text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Subscribers</p>
                                    <p className="text-xl font-bold text-gray-900">5,678</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
                                <Mail size={24} className="text-gray-400 mb-2" />
                                <p className="font-medium text-gray-900">Create Email Campaign</p>
                                <p className="text-sm text-gray-500 mt-1">Send newsletters to customers</p>
                            </button>
                            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
                                <MessageSquare size={24} className="text-gray-400 mb-2" />
                                <p className="font-medium text-gray-900">SMS Campaign</p>
                                <p className="text-sm text-gray-500 mt-1">Send promotional SMS</p>
                            </button>
                            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
                                <Target size={24} className="text-gray-400 mb-2" />
                                <p className="font-medium text-gray-900">Create Promotion</p>
                                <p className="text-sm text-gray-500 mt-1">Set up discount codes</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'campaigns' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-center py-12">
                        <Send size={48} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Campaigns</h3>
                        <p className="text-gray-500 mb-4">Create your first marketing campaign to engage customers</p>
                        <button className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800">
                            Create Campaign
                        </button>
                    </div>
                </div>
            )}

            {selectedTab === 'email' && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Email Templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: 'Welcome Email', desc: 'Greet new customers' },
                            { name: 'Order Confirmation', desc: 'Confirm order details' },
                            { name: 'Shipping Update', desc: 'Notify shipping status' },
                            { name: 'Promotional Email', desc: 'Share special offers' },
                        ].map((template, i) => (
                            <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                                <h3 className="font-medium text-gray-900">{template.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{template.desc}</p>
                                <button className="mt-3 text-sm text-blue-600 hover:underline">Edit Template</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
