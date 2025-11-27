'use server'

import { createClient } from "../../lib/supabase/server";

export async function getBlockedDates() {
    const supabase = await createClient();

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
    const supabase = await createClient();

    try {
        // Get all dates with capacity limits
        const { data: capacities, error: capacityError } = await supabase
            .from('daily_capacity')
            .select('date, max_slots')
            .gt('max_slots', 0); // Dates with limits (not blocked, not unlimited)

        if (capacityError) throw capacityError;

        if (!capacities || capacities.length === 0) {
            return { success: true, data: [] };
        }

        // For each date with a limit, check if it's full
        const fullDates: string[] = [];

        for (const capacity of capacities) {
            const { count, error: countError } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })
                .eq('wedding_date', capacity.date)
                .neq('status', 'cancelled');

            if (countError) continue;

            if (count !== null && count >= capacity.max_slots) {
                fullDates.push(capacity.date);
            }
        }

        return { success: true, data: fullDates };
    } catch (error: any) {
        console.error("Error fetching full dates:", error);
        return { success: false, error: error.message };
    }
}
