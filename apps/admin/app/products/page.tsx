import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getProducts } from "../../lib/services/products";
import { ProductFilters } from "../../components/ProductFilters";
import { DeleteProductButton } from "../../components/DeleteProductButton";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const category = typeof params.category === 'string' ? params.category : undefined;
    const status = typeof params.status === 'string' ? params.status : undefined;
    const search = typeof params.search === 'string' ? params.search : undefined;

    const products = await getProducts({ category, status, search });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
                <Link
                    href="/products/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800"
                >
                    <Plus size={16} />
                    상품 등록
                </Link>
            </div>

            {/* Filters */}
            <ProductFilters />

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3">상품명</th>
                            <th className="px-6 py-3">카테고리</th>
                            <th className="px-6 py-3">가격</th>
                            <th className="px-6 py-3">재고</th>
                            <th className="px-6 py-3">상태</th>
                            <th className="px-6 py-3 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">등록된 상품이 없습니다.</td>
                            </tr>
                        ) : (
                            products.map((product: any) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">₩{product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {product.status === "active" ? "판매중" : "판매중지"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="text-gray-400 hover:text-blue-600 transition-colors"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <DeleteProductButton id={product.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
