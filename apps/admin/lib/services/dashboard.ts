import { createClient } from '../supabase/client';

export async function getDashboardStats() {
    const supabase = createClient();

    // Fetch counts in parallel
    const [
        { count: newOrdersCount },
        { count: pendingPaymentCount },
        { count: preparingCount },
        { count: deliveredCount },
        { data: recentOrders },
        { data: recentUsers }
    ] = await Promise.all([
        // 1. New Orders (Paid + Pending) - treating 'paid' as new for now
        supabase.from('orders').select('*', { count: 'exact', head: true }).in('status', ['paid', 'pending']),
        // 2. Payment Pending
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        // 3. Preparing
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'preparing'),
        // 4. Delivered
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'delivered'),
        // 5. Recent Orders
        supabase.from('orders')
            .select(`
                *,
                profiles (name, email)
            `)
            .order('created_at', { ascending: false })
            .limit(5),
        // 6. Recent Users
        supabase.from('profiles')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5)
    ]);

    return {
        stats: {
            newOrders: newOrdersCount || 0,
            paymentPending: pendingPaymentCount || 0,
            preparing: preparingCount || 0,
            delivered: deliveredCount || 0,
        },
        recentOrders: recentOrders || [],
        recentUsers: recentUsers || [],
    };
}
