"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { brandsApi, productsApi } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

export default function BrandDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: brand, isLoading: brandLoading } = useQuery({
    queryKey: ["brand", id],
    queryFn: async () => (await brandsApi.getById(id)).data.data,
    enabled: Boolean(id),
  });

  const { data: products, isLoading: prodLoading } = useQuery({
    queryKey: ["products-by-brand", id],
    queryFn: async () =>
      (await productsApi.getAll({ brand: id, limit: 40 })).data.data,
    enabled: Boolean(id),
  });

  if (brandLoading || prodLoading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {brand?.name || "Brand"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {products?.length || 0} products from this brand
        </p>
      </div>

      {products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title="No products for this brand"
          actionLabel="Browse all products"
          actionHref="/products"
        />
      )}
    </div>
  );
}
