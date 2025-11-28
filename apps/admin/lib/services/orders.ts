import { createClient } from '../supabase/server';

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    console.error(`Error updating order ${orderId}:`, error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
