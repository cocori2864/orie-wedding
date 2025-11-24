import { ProductGallery } from "../../../components/pdp/ProductGallery";
import { ProductInfo } from "../../../components/pdp/ProductInfo";
import { getProduct } from "../../../lib/services/products";
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
        <main className="pt-24 pb-20 min-h-screen">
            <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10">
                <div className="flex flex-col md:flex-row gap-10">
                    <ProductGallery image={product.image} name={product.name} />
                    <ProductInfo
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                        category={product.category}
                        flowers={product.flowers}
                    />
                </div>
            </div>
        </main>
    );
}
