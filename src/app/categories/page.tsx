"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CategoriesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await categoriesApi.getAll()).data.data,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
        <p className="mt-1 text-sm text-slate-500">
          Explore products by category
        </p>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="py-16 text-center text-red-500">Failed to load categories.</p>
      )}

      {data && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="font-semibold text-slate-900 group-hover:text-brand">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
