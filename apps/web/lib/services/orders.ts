import { createClient } from '../supabase/client';

export async function createOrder(orderData: {
    userId?: string;
    guestInfo?: {
        name: string;
        email: string;
        phone: string;
    };
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
        options?: any;
    }>;
    totalAmount: number;
    deliveryMethod: 'quick' | 'pickup';
    deliveryInfo: {
        date: string;
        time: string;
        address?: string;
        detailAddress?: string;
        note?: string;
    };
    paymentMethod: string;
}) {
    const supabase = createClient();

    try {
        // 1. Create Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: orderData.userId || null,
                guest_info: orderData.guestInfo || null,
                total_amount: orderData.totalAmount,
                status: 'pending',
                payment_method: orderData.paymentMethod,
                delivery_method: orderData.deliveryMethod,
                delivery_info: orderData.deliveryInfo,
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create Order Items
        const orderItems = orderData.items.map(item => ({
            order_id: order.id,
            product_id: item.productId,
            quantity: item.quantity,
            price_at_purchase: item.price,
            options: item.options || null,
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return { success: true, orderId: order.id };
    } catch (error: any) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }
}

export async function getUserOrders(userId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }

    return data;
}
