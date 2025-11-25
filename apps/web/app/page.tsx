import { getProducts } from "../lib/services/products";
import { GalleryMain } from "../components/main/GalleryMain";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="flex flex-col items-center min-h-screen bg-orie-bg">
      <GalleryMain products={products} />
    </main>
  );
}
