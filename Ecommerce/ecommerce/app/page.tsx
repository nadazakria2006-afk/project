import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/services/product.service";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 font-sans">

      <section className="flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
          Welcome to ShopMart
        </h1>

        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded bg-black px-8 text-sm font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Shop Now
          </Link>
          <Link
            href="/categories"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded border border-zinc-200 bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:bg-transparent dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
          >
            Browse Categories
          </Link>
        </div>
      </section>
    </div>
  );
}
