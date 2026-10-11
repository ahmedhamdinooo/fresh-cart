"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { brandsApi } from "@/lib/api";

export default function BrandsStrip() {
  const { data } = useQuery({
    queryKey: ["brands-home"],
    queryFn: async () => {
      const res = await brandsApi.getAll();
      return res.data.data.slice(0, 8);
    },
  });

  if (!data?.length) return null;

  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Top Brands</h2>
            <p className="mt-1 text-sm text-slate-500">Trusted names you know</p>
          </div>
          <Link
            href="/brands"
            className="text-sm font-semibold text-brand hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {data.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-brand/30 hover:bg-white hover:shadow-sm"
            >
              <div className="relative h-14 w-14">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <span className="truncate text-xs font-medium text-slate-700">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
