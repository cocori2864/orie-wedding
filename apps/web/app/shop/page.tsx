import { getProducts } from "../../lib/services/products";
import { ShopContent } from "../../components/shop/ShopContent";

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-4 text-orie-text">Wedding Bouquet</h1>
                <p className="text-center text-orie-text/60 mb-12">Elegance for Your Special Moment</p>
                <ShopContent initialProducts={products} />
            </div>
        </main>
    );
}
