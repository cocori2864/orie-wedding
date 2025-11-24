"use client";

import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const PRODUCTS = [
    { id: "1", name: "Classic Rose Bouquet", price: 180000, category: "Classic", stock: 15, status: "Active" },
    { id: "2", name: "White Peony Bouquet", price: 220000, category: "Classic", stock: 8, status: "Active" },
    { id: "3", name: "Wild Flower Bouquet", price: 150000, category: "Natural", stock: 20, status: "Active" },
    { id: "4", name: "Eucalyptus Greenery", price: 160000, category: "Natural", stock: 12, status: "Active" },
    { id: "5", name: "Blush Pink Bouquet", price: 200000, category: "Romantic", stock: 0, status: "Out of Stock" },
];

export default function ProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <Link
                    href="/products/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800"
                >
                    <Plus size={16} />
                    Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400">
                        <option>All Categories</option>
                        <option>Classic</option>
                        <option>Natural</option>
                        <option>Romantic</option>
                        <option>Premium</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Out of Stock</option>
                        <option>Archived</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {PRODUCTS.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">₩{product.price.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                        <Edit size={18} />
                                    </button>
                                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
