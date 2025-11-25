import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
    // Service Role Key가 없으면 에러가 날 수 있으므로 체크하거나 예외 처리
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
        console.warn("SUPABASE_SERVICE_ROLE_KEY is missing. Falling back to ANON_KEY (RLS enforced).");
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
}
