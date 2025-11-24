"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";

export default function NewProductPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        color: "",
        style: "",
        flowers: "",
        status: "active",
        image: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price) {
            alert("Please fill in required fields (Name, Price)");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('products').insert({
                name: formData.name,
                description: formData.description,
                price: parseInt(formData.price),
                stock: parseInt(formData.stock) || 0,
                category: formData.category,
                color: formData.color,
                style: formData.style,
                flowers: formData.flowers,
                status: formData.status,
                image: formData.image || "/images/bouquet_01.png", // Default fallback
            });

            if (error) throw error;

            alert("Product created successfully!");
            router.push("/products");
        } catch (error: any) {
            console.error("Error creating product:", error);
            alert("Failed to create product: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/products" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Product Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Classic Rose Bouquet"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={4}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Product description..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>

                    {/* Pricing & Inventory */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing & Inventory</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Price (₩) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Attributes */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Attributes</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Color</label>
                                <select
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                >
                                    <option value="">Select Color</option>
                                    <option value="White">White</option>
                                    <option value="Pink">Pink</option>
                                    <option value="Peach">Peach</option>
                                    <option value="Green">Green</option>
                                    <option value="Purple">Purple</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Style</label>
                                <select
                                    name="style"
                                    value={formData.style}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                >
                                    <option value="">Select Style</option>
                                    <option value="Round">Round</option>
                                    <option value="Drop">Drop</option>
                                    <option value="Natural">Natural</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Flowers Used</label>
                            <input
                                type="text"
                                name="flowers"
                                value={formData.flowers}
                                onChange={handleChange}
                                placeholder="e.g. Rose, Tulip, Lily"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Organization & Media */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Status</h2>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                        >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Category</h2>
                        <div className="space-y-2">
                            {["Classic", "Natural", "Romantic", "Premium"].map((cat) => (
                                <label key={cat} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat}
                                        checked={formData.category === cat}
                                        onChange={handleChange}
                                        className="text-gray-900 focus:ring-gray-900"
                                    />
                                    <span className="text-sm text-gray-700">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Product Image</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="e.g. /images/bouquet_01.png"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                            <p className="text-xs text-gray-500">Enter a public URL or local path like /images/...</p>
                        </div>

                        {formData.image && (
                            <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden mt-4">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Link
                    href="/products"
                    className="px-6 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </Link>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>
            </div>
        </div>
    );
}
