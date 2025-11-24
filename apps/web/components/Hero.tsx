import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full h-screen flex justify-center items-center overflow-hidden">
            {/* Background Placeholder */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#E8E6E1] -z-10" />

            <div className="text-center z-10 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-light mb-6 text-orie-text tracking-tight">
                    Your Perfect Day
                </h1>
                <p className="text-lg md:text-xl font-normal mb-10 text-orie-text/80">
                    Timeless Wedding Bouquet Collection
                </p>
                <Link
                    href="/shop"
                    className="inline-block px-10 py-4 bg-orie-text text-orie-bg text-sm font-semibold rounded-sm hover:bg-[#5A6275] hover:-translate-y-0.5 transition-all duration-200"
                >
                    Discover Collection
                </Link>
            </div>
        </section>
    );
}
