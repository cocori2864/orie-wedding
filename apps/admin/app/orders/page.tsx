import Link from "next/link";
import { Download } from "lucide-react";
import { createClient } from "../../lib/supabase/server";
import { OrderFilters } from "../../components/OrderFilters";

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = await createClient();
    const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;

    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });

    if (status) {
        query = query.eq('status', status);
    }

    const { data: ordersData, error } = await query;

    if (error) {
        console.error("Error fetching orders:", error);
        return <div className="p-8 text-center text-red-600">주문 목록을 불러오는 중 오류가 발생했습니다.</div>;
    }

    // Transform data for display
    const orders = ordersData.map((order: any) => ({
        id: order.id.slice(0, 8).toUpperCase(),
        fullId: order.id,
        customer: order.customer_name || "Guest",
        date: new Date(order.created_at).toLocaleDateString('ko-KR'),
        status: order.status,
        total: order.total_amount,
        items: order.items?.length || 0,
    }));

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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
                    <p className="text-sm text-gray-500 mt-1">총 {orders.length}개의 주문</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Download size={16} />
                    내보내기
                </button>
            </div>

            {/* Filters */}
            <OrderFilters />

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                주문번호
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                고객명
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                접수일
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                상태
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                금액
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                관리
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    주문 내역이 없습니다
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.fullId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        ₩{order.total.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer">
                                        <Link href={`/orders/${order.fullId}`}>상세보기</Link>
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
