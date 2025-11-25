import { getProduct } from "../../../lib/services/products";
import { ProductInfo } from "../../../components/pdp/ProductInfo";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-20 bg-orie-bg">
            <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 flex flex-col md:flex-row gap-10 md:gap-20">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <ProductInfo
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                    category={product.category}
                    flowers={product.flowers}
                    color={product.color}
                />
            </div>
        </main>
    );
}
