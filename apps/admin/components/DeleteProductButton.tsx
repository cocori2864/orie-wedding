"use client";

import { Trash2 } from "lucide-react";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ id }: { id: string }) {
    const router = useRouter();
    const supabase = createClient();

    const handleDelete = async () => {
        if (!confirm("정말로 이 상품을 삭제하시겠습니까?")) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            router.refresh();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("상품 삭제에 실패했습니다.");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-600 transition-colors"
        >
            <Trash2 size={18} />
        </button>
    );
}
