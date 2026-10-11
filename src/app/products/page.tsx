"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { productsApi, brandsApi, categoriesApi } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page") || 1);
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const sort = searchParams.get("sort") || "";

  const [searchInput, setSearchInput] = useState(keyword);

  const queryParams = useMemo(
    () => ({
      page,
      limit: 12,
      ...(keyword ? { keyword } : {}),
      ...(category ? { category } : {}),
      ...(brand ? { brand } : {}),
      ...(sort ? { sort } : {}),
    }),
    [page, keyword, category, brand, sort],
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const res = await productsApi.getAll(queryParams);
      return res.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await categoriesApi.getAll()).data.data,
  });

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => (await brandsApi.getAll()).data.data,
  });

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (!("page" in updates)) params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
        <p className="mt-1 text-sm text-slate-500">
          {data ? `${data.results} products found` : "Browse our catalog"}
        </p>
      </div>

      <div className="mb-8 grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 md:grid-cols-2 lg:grid-cols-5">
        <form
          className="lg:col-span-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateParams({ keyword: searchInput.trim() });
          }}
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </form>

        <select
          value={category}
          onChange={(e) => updateParams({ category: e.target.value })}
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
        >
          <option value="">All Categories</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => updateParams({ brand: e.target.value })}
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
        >
          <option value="">All Brands</option>
          {brands?.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
        >
          <option value="">Default Sort</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-ratingsAverage">Top Rated</option>
          <option value="-sold">Best Selling</option>
        </select>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="py-16 text-center text-red-500">Failed to load products.</p>
      )}
      {data && data.data.length === 0 && (
        <EmptyState
          title="No products found"
          description="Try adjusting your search or filters."
          actionLabel="Clear filters"
          actionHref="/products"
        />
      )}
      {data && data.data.length > 0 && (
        <>
          <ProductGrid products={data.data} />
          <Pagination
            currentPage={data.metadata?.currentPage || page}
            totalPages={data.metadata?.numberOfPages || 1}
            onChange={(next) => updateParams({ page: String(next) })}
          />
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsContent />
    </Suspense>
  );
}
