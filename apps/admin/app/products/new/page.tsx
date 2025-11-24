"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";

export default function NewProductPage() {
    const [images, setImages] = useState<string[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Mock upload - in real app, upload to server/s3
            const url = URL.createObjectURL(e.target.files[0]);
            setImages([...images, url]);
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
                            <label className="text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Classic Rose Bouquet"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={4}
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
                                <label className="text-sm font-medium text-gray-700">Price (₩)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
                                <input
                                    type="number"
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
                                <select className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400">
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
                                <select className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400">
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
                        <select className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400">
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
                                    <input type="radio" name="category" value={cat} className="text-gray-900 focus:ring-gray-900" />
                                    <span className="text-sm text-gray-700">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Product Images</h2>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group">
                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-xs text-gray-500">Click to upload image</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </label>
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
                <button className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800">
                    Save Product
                </button>
            </div>
        </div>
    );
}
