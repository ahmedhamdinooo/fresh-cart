"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function FeaturedProducts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await productsApi.getAll({ limit: 12, page: 1 });
      return res.data.data;
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Popular Products
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Handpicked items customers love
          </p>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-brand hover:underline"
        >
          View all
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="py-10 text-center text-sm text-red-500">
          Failed to load products. Please try again.
        </p>
      )}
      {data && <ProductGrid products={data} />}
    </section>
  );
}
