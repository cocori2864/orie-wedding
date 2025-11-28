'use server'

import { createAdminClient } from "../../lib/supabase/admin";

export async function getBlockedDates() {
    const supabase = createAdminClient();

    try {
        const { data, error } = await supabase
            .from('daily_capacity')
            .select('date, max_slots')
            .eq('max_slots', 0); // Only get blocked dates (max_slots = 0)

        if (error) throw error;

        return { success: true, data: data || [] };
    } catch (error: any) {
        console.error("Error fetching blocked dates:", error);
        return { success: false, error: error.message };
    }
}

export async function getFullDates() {
    const supabase = createAdminClient();

    try {
        // Get all dates with capacity limits (future only)
        const today = new Date();
        const offset = today.getTimezoneOffset() * 60000;
        const todayStr = new Date(today.getTime() - offset).toISOString().split('T')[0];

        const { data: capacities, error: capacityError } = await supabase
            .from('daily_capacity')
            .select('date, max_slots')
            .gt('max_slots', 0)
            .gte('date', todayStr); // Dates with limits (not blocked, not unlimited)

        if (capacityError) throw capacityError;

        if (!capacities || capacities.length === 0) {
            return { success: true, data: [] };
        }

        // For each date with a limit, check if it's full
        const fullDates: string[] = [];

        for (const capacity of capacities) {
            // Use range query to handle both DATE and TIMESTAMP types safely
            // This matches the logic in createOrder.ts
            const [y, m, d] = capacity.date.split('-').map(Number);
            const date = new Date(y, m - 1, d);
            date.setDate(date.getDate() + 1);
            const nextY = date.getFullYear();
            const nextM = String(date.getMonth() + 1).padStart(2, '0');
            const nextD = String(date.getDate()).padStart(2, '0');
            const nextDateString = `${nextY}-${nextM}-${nextD}`;

            const { count, error: countError } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })
                .gte('wedding_date', capacity.date)
                .lt('wedding_date', nextDateString)
                .neq('status', 'cancelled');

            if (countError) continue;

            const maxSlots = Number(capacity.max_slots);
            // console.log(`[getFullDates] Date: ${capacity.date}, Count: ${count}, Max: ${maxSlots}`);
            if (count !== null && maxSlots > 0 && count >= maxSlots) {
                console.log(`[getFullDates] Full Date Found: ${capacity.date} (Count: ${count}, Max: ${maxSlots})`);
                fullDates.push(capacity.date);
            }
        }

        return { success: true, data: fullDates };
    } catch (error: any) {
        console.error("Error fetching full dates:", error);
        return { success: false, error: error.message };
    }
}
