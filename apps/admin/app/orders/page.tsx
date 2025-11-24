import Link from "next/link";
import { Search, Filter, Download } from "lucide-react";
import { getAllOrders } from "../../lib/services/orders";

export default async function OrdersPage() {
    const ordersData = await getAllOrders();

    // Transform data for display
    const orders = ordersData.map((order: any) => ({
        id: order.id.slice(0, 8),
        fullId: order.id,
        customer: order.profiles?.name || order.guest_info?.name || "Guest",
        date: new Date(order.created_at).toLocaleDateString('ko-KR'),
        status: order.status,
        total: order.total_amount,
        items: order.order_items?.length || 0,
    }));

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
        const statusMap: Record<string, string> = {
            pending: '결제 대기',
            paid: '결제 완료',
            preparing: '준비 중',
            shipped: '배송 중',
            delivered: '배송 완료',
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
                    Export
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="주문번호, 고객명으로 검색..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-900"
                    />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-900">
                    <option value="">전체 상태</option>
                    <option value="pending">결제 대기</option>
                    <option value="paid">결제 완료</option>
                    <option value="preparing">준비 중</option>
                    <option value="shipped">배송 중</option>
                    <option value="delivered">배송 완료</option>
                    <option value="cancelled">취소됨</option>
                </select>
            </div>

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
                                주문일
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                상태
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                금액
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                액션
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
                                        <Link href={`/orders/${order.fullId}`}>View</Link>
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
