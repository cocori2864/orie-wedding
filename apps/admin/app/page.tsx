import {
  ShoppingBag,
  CreditCard,
  Package,
  CheckCircle,
  Users,
  XCircle
} from "lucide-react";
import Link from "next/link";
import { createAdminClient } from "../lib/supabase/admin";

export default async function Dashboard() {
  const supabase = createAdminClient();

  const [
    { count: pendingCount },
    { count: paymentPendingCount },
    { count: confirmedCount },
    { count: cancelledCount },
    { data: recentOrders },
    { data: recentUsers }
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'payment_pending'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'cancelled'),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5)
  ]);

  const STATS = [
    { label: "예약 대기", value: pendingCount || 0, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "예약금 대기", value: paymentPendingCount || 0, icon: CreditCard, color: "bg-orange-500" },
    { label: "예약 확정", value: confirmedCount || 0, icon: CheckCircle, color: "bg-green-500" },
    { label: "취소됨", value: cancelledCount || 0, icon: XCircle, color: "bg-red-500" },
  ];

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      pending: '예약 대기',
      payment_pending: '예약금 대기',
      confirmed: '예약 확정',
      cancelled: '취소됨',
    };
    return map[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'payment_pending':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 mt-1">관리자님, 환영합니다.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">최근 주문</h2>
            <Link href="/orders" className="text-sm text-blue-600 hover:underline">전체 보기</Link>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="pb-4">주문번호</th>
                  <th className="pb-4">고객명</th>
                  <th className="pb-4">금액</th>
                  <th className="pb-4">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!recentOrders || recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">최근 주문이 없습니다.</td>
                  </tr>
                ) : (
                  recentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td className="py-4 text-sm font-medium text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="py-4 text-sm text-gray-600">
                        {order.customer_name || "Guest"}
                      </td>
                      <td className="py-4 text-sm text-gray-900">₩{order.total_amount.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity (New Users) */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">신규 가입</h2>
          </div>
          <div className="p-6 space-y-6">
            {!recentUsers || recentUsers.length === 0 ? (
              <p className="text-center text-gray-500">신규 가입자가 없습니다.</p>
            ) : (
              recentUsers.map((user: any) => (
                <div key={user.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Users size={14} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{user.name || user.email}</span> 님이 가입했습니다.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(user.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
