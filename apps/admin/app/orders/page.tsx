import Link from "next/link";
import { Download } from "lucide-react";
import { createAdminClient } from "../../lib/supabase/admin";
import { OrderFilters } from "../../components/OrderFilters";

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const supabase = createAdminClient();
    const status = typeof params.status === 'string' ? params.status : undefined;

    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });

    if (status) {
        query = query.eq('status', status);
    }

    const { data: ordersData, error } = await query;

    const isServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (error) {
        console.error("Error fetching orders:", error);
        return <div className="p-8 text-center text-red-600">주문 목록을 불러오는 중 오류가 발생했습니다.</div>;
    }

    // Transform data for display
    const orders = ordersData.map((order: any) => ({
        id: order.id.slice(0, 8).toUpperCase(),
        fullId: order.id,
        customer: order.customer_name || "Guest",
        date: new Date(order.created_at).toLocaleString('ko-KR'),
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
            {!isServiceRole && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-amber-700">
                                <strong>주의:</strong> SUPABASE_SERVICE_ROLE_KEY 환경 변수가 설정되지 않았습니다.
                                <br />
                                이 키가 없으면 관리자라도 본인의 주문 내역만 볼 수 있습니다.
                                <br />
                                .env 파일에 키를 추가하고 서버를 재시작해주세요.
                            </p>
                        </div>
                    </div>
                </div>
            )}
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
