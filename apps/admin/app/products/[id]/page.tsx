"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { getProduct, updateProduct } from "../../actions/productActions";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data, error } = await getProduct(params.id as string);

                if (error) throw error;

                if (data) {
                    setFormData({
                        name: data.name || "",
                        description: data.description || "",
                        price: data.price?.toString() || "",
                        stock: data.stock?.toString() || "",
                        category: data.category || "",
                        color: data.color || "",
                        style: data.style || "",
                        flowers: data.flowers || "",
                        status: data.status || "active",
                        image: data.image || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                alert("Failed to load product");
                router.push("/products");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price) {
            alert("필수 항목(상품명, 가격)을 입력해주세요.");
            return;
        }

        setSaving(true);
        try {
            const { error } = await updateProduct(params.id as string, {
                name: formData.name,
                description: formData.description,
                price: parseInt(formData.price),
                stock: parseInt(formData.stock) || 0,
                category: formData.category,
                color: formData.color,
                style: formData.style,
                flowers: formData.flowers,
                status: formData.status,
                image: formData.image,
            });

            if (error) throw error;

            alert("상품 정보가 수정되었습니다!");
            router.push("/products");
        } catch (error: any) {
            console.error("Error updating product:", error);
            alert("상품 수정에 실패했습니다: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">상품 정보를 불러오는 중...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/products" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">상품 수정</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Product Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">기본 정보</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">상품명 *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="예: 클래식 로즈 부케"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">설명</label>
                            <textarea
                                rows={4}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="상품 설명을 입력하세요..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>

                    {/* Pricing & Inventory */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">가격 및 재고</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">가격 (₩) *</label>
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
                                <label className="text-sm font-medium text-gray-700">재고 수량</label>
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
                        <h2 className="text-lg font-bold text-gray-900 mb-4">속성</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">색상</label>
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    placeholder="예: White & Green"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">스타일</label>
                                <select
                                    name="style"
                                    value={formData.style}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                                >
                                    <option value="">스타일 선택</option>
                                    <option value="Round">Round</option>
                                    <option value="Drop">Drop</option>
                                    <option value="Natural">Natural</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">사용된 꽃</label>
                            <input
                                type="text"
                                name="flowers"
                                value={formData.flowers}
                                onChange={handleChange}
                                placeholder="예: Rose, Tulip, Lily"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Organization & Media */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">상태</h2>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                        >
                            <option value="active">판매중</option>
                            <option value="draft">임시저장</option>
                            <option value="discontinued">판매중지</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">카테고리</h2>
                        <div className="space-y-2">
                            {[
                                { id: "simple", label: "심플 (촬영용)" },
                                { id: "premium", label: "프리미엄 (본식용)" },
                                { id: "custom", label: "커스텀" },
                                { id: "etc", label: "기타" }
                            ].map((cat) => (
                                <label key={cat.id} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat.id}
                                        checked={formData.category === cat.id}
                                        onChange={handleChange}
                                        className="text-gray-900 focus:ring-gray-900"
                                    />
                                    <span className="text-sm text-gray-700">{cat.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">상품 이미지</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">이미지 URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="예: /images/bouquet_01.png"
                                className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
                            />
                            <p className="text-xs text-gray-500">공개 URL 또는 /images/... 와 같은 로컬 경로를 입력하세요.</p>
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
                    취소
                </Link>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                    {saving ? "저장 중..." : "변경사항 저장"}
                </button>
            </div>
        </div>
    );
}
