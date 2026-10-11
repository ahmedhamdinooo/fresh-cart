"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { brandsApi } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function BrandsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => (await brandsApi.getAll()).data.data,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Brands</h1>
        <p className="mt-1 text-sm text-slate-500">Shop by your favorite brands</p>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <p className="py-16 text-center text-red-500">Failed to load brands.</p>
      )}

      {data && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
            >
              <div className="relative h-20 w-20">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <h2 className="text-center text-sm font-semibold text-slate-800 group-hover:text-brand">
                {brand.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
