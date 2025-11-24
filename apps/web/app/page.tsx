import { Hero } from "../components/Hero";
import { ProductCard } from "../components/shop/ProductCard";
import { getProducts } from "../lib/services/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="flex flex-col items-center">
      <Hero />

      <section className="py-24 flex flex-col items-center w-full">
        <h2 className="text-3xl font-normal mb-16 text-center text-orie-text">
          Featured Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-[1600px] px-5 md:px-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
