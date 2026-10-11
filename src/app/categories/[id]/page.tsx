"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categoriesApi, productsApi } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

export default function CategoryDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: category, isLoading: catLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => (await categoriesApi.getById(id)).data.data,
    enabled: Boolean(id),
  });

  const { data: products, isLoading: prodLoading } = useQuery({
    queryKey: ["products-by-category", id],
    queryFn: async () =>
      (await productsApi.getAll({ category: id, limit: 40 })).data.data,
    enabled: Boolean(id),
  });

  if (catLoading || prodLoading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {category?.name || "Category"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {products?.length || 0} products in this category
        </p>
      </div>

      {products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title="No products in this category"
          actionLabel="Browse all products"
          actionHref="/products"
        />
      )}
    </div>
  );
}
