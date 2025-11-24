import {
  ShoppingBag,
  CreditCard,
  Package,
  CheckCircle,
  Users
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "../lib/services/dashboard";

export default async function Dashboard() {
  const { stats, recentOrders, recentUsers } = await getDashboardStats();

  const STATS = [
    { label: "New Orders", value: stats.newOrders, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Payment Pending", value: stats.paymentPending, icon: CreditCard, color: "bg-orange-500" },
    { label: "Preparing", value: stats.preparing, icon: Package, color: "bg-purple-500" },
    { label: "Delivered", value: stats.delivered, icon: CheckCircle, color: "bg-green-500" },
  ];

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin</p>
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
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link href="/orders" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">No recent orders</td>
                  </tr>
                ) : (
                  recentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td className="py-4 text-sm font-medium text-gray-900">#{order.id.slice(0, 8)}</td>
                      <td className="py-4 text-sm text-gray-600">
                        {order.profiles?.name || order.guest_info?.name || "Guest"}
                      </td>
                      <td className="py-4 text-sm text-gray-900">₩{order.total_amount.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
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
            <h2 className="text-lg font-bold text-gray-900">New Users</h2>
          </div>
          <div className="p-6 space-y-6">
            {recentUsers.length === 0 ? (
              <p className="text-center text-gray-500">No new users</p>
            ) : (
              recentUsers.map((user: any) => (
                <div key={user.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Users size={14} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{user.name || user.email}</span> joined
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(user.created_at).toLocaleDateString()}
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
