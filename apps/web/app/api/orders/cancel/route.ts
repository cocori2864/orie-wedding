import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        // Service Role Key를 사용하여 RLS를 우회하는 관리자 클라이언트 생성
        // 주의: SUPABASE_SERVICE_ROLE_KEY가 환경 변수에 설정되어 있어야 합니다.
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { error } = await supabaseAdmin
            .from('orders')
            .update({ status: 'cancelled' })
            .eq('id', orderId);

        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Cancel order error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
