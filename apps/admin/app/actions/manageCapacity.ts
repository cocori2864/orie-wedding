'use server'

import { createAdminClient } from "../../lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function manageCapacity(date: string, limit: number | null) {
    const supabase = createAdminClient();

    try {
        if (limit === null) {
            // Delete the limit (make it unlimited)
            const { error } = await supabase
                .from('daily_capacity')
                .delete()
                .eq('date', date);

            if (error) throw error;
        } else {
            // Upsert the limit
            const { error } = await supabase
                .from('daily_capacity')
                .upsert({ date, max_slots: limit })
                .select();

            if (error) throw error;
        }

        revalidatePath('/calendar');
        return { success: true };
    } catch (error: any) {
        console.error("Error managing capacity:", error);
        return { success: false, error: error.message };
    }
}

export async function getMonthlyCapacity(year: number, month: number) {
    const supabase = createAdminClient();

    // Calculate start and end dates of the month
    // Calculate start and end dates of the month
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const offset = start.getTimezoneOffset() * 60000;
    const startDate = new Date(start.getTime() - offset).toISOString().split('T')[0];
    const endDate = new Date(end.getTime() - offset).toISOString().split('T')[0];

    try {
        const { data, error } = await supabase
            .from('daily_capacity')
            .select('*')
            .gte('date', startDate)
            .lte('date', endDate);

        if (error) throw error;
        return { success: true, data };
    } catch (error: any) {
        console.error("Error fetching capacity:", error);
        return { success: false, error: error.message };
    }
}

export async function getMonthlyOrders(year: number, month: number) {
    const supabase = createAdminClient();

    // Calculate start and end dates of the month
    // Calculate start and end dates of the month
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const offset = start.getTimezoneOffset() * 60000;
    const startDate = new Date(start.getTime() - offset).toISOString().split('T')[0];
    const endDate = new Date(end.getTime() - offset).toISOString().split('T')[0];

    try {
        const { data, error } = await supabase
            .from('orders')
            .select('id, wedding_date, customer_name, guest_info')
            .gte('wedding_date', startDate)
            .lte('wedding_date', endDate)
            .neq('status', 'cancelled');

        if (error) throw error;
        return { success: true, data };
    } catch (error: any) {
        console.error("Error fetching monthly orders:", error);
        return { success: false, error: error.message };
    }
}
