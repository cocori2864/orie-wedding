import Link from "next/link";
import { ArrowLeft, Printer, Truck } from "lucide-react";
import { createAdminClient } from "../../../lib/supabase/admin";
import { notFound } from "next/navigation";
import { OrderStatusActions } from "../../../components/OrderStatusActions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = createAdminClient();

    const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !order) {
        notFound();
    }

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'payment_pending':
                return 'bg-orange-100 text-orange-800';
            case 'pending':
                return 'bg-gray-100 text-gray-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            pending: '예약 대기중',
            payment_pending: '예약금 대기 중',
            confirmed: '예약 확정',
            cancelled: '취소됨',
        };
        return statusMap[status] || status;
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
                        <h1 className="text-2xl font-bold text-gray-900">주문 #{order.id.slice(0, 8).toUpperCase()}</h1>
                        <p className="text-sm text-gray-500">
                            {(() => {
                                const dateObj = new Date(order.created_at);
                                const kstDate = new Date(dateObj.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
                                const year = kstDate.getFullYear();
                                const month = String(kstDate.getMonth() + 1).padStart(2, '0');
                                const day = String(kstDate.getDate()).padStart(2, '0');
                                const hours = String(kstDate.getHours()).padStart(2, '0');
                                const minutes = String(kstDate.getMinutes()).padStart(2, '0');
                                return `${year}-${month}-${day} ${hours}:${minutes}`;
                            })()}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                    </span>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Printer size={16} />
                        인쇄
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Items & Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">주문 상품</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.items?.map((item: any, idx: number) => (
                                <div key={idx} className="p-6 flex gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                                        {item.image && (
                                            <img
                                                src={item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000'}${item.image}`}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {item.name}
                                        </h3>
                                        {item.options && (
                                            <div className="text-sm text-gray-500 mt-1 space-y-1">
                                                {item.options.color && <p>색상: {item.options.color}</p>}
                                                {item.options.flowers && <p>꽃 구성: {item.options.flowers}</p>}
                                                {item.options.corsageCount > 0 && <p>코사지: {item.options.corsageCount}개</p>}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            ₩{item.price.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">수량: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                                <span>총 결제 금액</span>
                                <span>₩{order.total_amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Wedding Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">예식 정보</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">예식일</p>
                                <p className="font-medium mt-1">
                                    {order.wedding_date ? new Date(order.wedding_date).toLocaleDateString('ko-KR') : '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">예식 시간</p>
                                <p className="font-medium mt-1">{order.wedding_time || '-'}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">예식 장소</p>
                                <p className="font-medium mt-1">{order.venue || '-'}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">수령 장소</p>
                                <p className="font-medium mt-1">{order.pickup_location || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Requests */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">요청 사항</h2>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {order.requests ? order.requests : "요청 사항이 없습니다."}
                        </p>
                    </div>
                </div>

                {/* Right Column: Customer & Actions */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">고객 정보</h2>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                {order.customer_name?.charAt(0) || 'G'}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">
                                    {order.customer_name || 'Guest'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    회원
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                            {order.customer_phone && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span>📞</span> {order.customer_phone}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">관리</h2>
                        <OrderStatusActions
                            orderId={order.id}
                            currentStatus={order.status}
                            finalPaymentStatus={order.final_payment_status}
                            customerPhone={order.customer_phone}
                            customerName={order.customer_name}
                            totalAmount={order.total_amount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
