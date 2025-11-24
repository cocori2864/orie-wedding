import Link from "next/link";
import { ArrowLeft, Printer, Truck, XCircle } from "lucide-react";
import { getOrderById } from "@/lib/services/orders";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
        notFound();
    }

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'preparing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-gray-100 text-gray-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'paid': return '결제 완료';
            case 'pending': return '결제 대기';
            case 'preparing': return '준비 중';
            case 'shipped': return '배송 중';
            case 'delivered': return '배송 완료';
            case 'cancelled': return '취소됨';
            default: return status;
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/orders" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h1>
                        <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleString('ko-KR')}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
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
                            {order.order_items?.map((item: any) => (
                                <div key={item.id} className="p-6 flex gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0">
                                        {item.products?.image_url && (
                                            <img
                                                src={item.products.image_url}
                                                alt={item.products.name}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {item.products?.name || 'Product'}
                                        </h3>
                                        {item.products?.category && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.products.category}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            ₩{item.price.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span>₩{order.total_amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Payment Method</p>
                                <p className="font-medium mt-1">{order.payment_method || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Payment Date</p>
                                <p className="font-medium mt-1">
                                    {new Date(order.created_at).toLocaleDateString('ko-KR')}
                                </p>
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
                                {order.profiles?.name?.charAt(0).toUpperCase() ||
                                    order.guest_info?.name?.charAt(0).toUpperCase() || 'G'}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">
                                    {order.profiles?.name || order.guest_info?.name || 'Guest'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {order.user_id ? 'Member' : 'Guest'}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                            {(order.profiles?.email || order.guest_info?.email) && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span>📧</span> {order.profiles?.email || order.guest_info?.email}
                                </div>
                            )}
                            {order.guest_info?.phone && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span>📞</span> {order.guest_info.phone}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Method</p>
                                <p className="text-sm font-medium mt-1">
                                    {order.delivery_method === 'quick' ? 'Quick Service' : 'Pickup'}
                                </p>
                            </div>
                            {order.delivery_date && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Scheduled For</p>
                                    <p className="text-sm font-medium mt-1 text-blue-600">
                                        {new Date(order.delivery_date).toLocaleDateString('ko-KR')}
                                        {order.delivery_time && ` at ${order.delivery_time}`}
                                    </p>
                                </div>
                            )}
                            {order.guest_info?.address && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Address</p>
                                    <p className="text-sm mt-1 text-gray-700">
                                        {order.guest_info.address}
                                    </p>
                                </div>
                            )}
                            {order.guest_info?.note && (
                                <div className="bg-yellow-50 p-3 rounded-md">
                                    <p className="text-xs font-medium text-yellow-800 mb-1">Note</p>
                                    <p className="text-sm text-yellow-700">{order.guest_info.note}</p>
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
