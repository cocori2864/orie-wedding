"use client";

import { Trash2 } from "lucide-react";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ id }: { id: string }) {
    const router = useRouter();
    const supabase = createClient();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            router.refresh();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
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
