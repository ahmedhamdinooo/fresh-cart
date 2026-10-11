"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { categoriesApi } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CategorySlider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoriesApi.getAll();
      return res.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner className="min-h-[20vh]" />;
  if (isError || !data?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Browse our curated collections
          </p>
        </div>
        <Link
          href="/categories"
          className="text-sm font-semibold text-brand hover:underline"
        >
          View all
        </Link>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={16}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2.2 },
          640: { slidesPerView: 3.2 },
          768: { slidesPerView: 4.2 },
          1024: { slidesPerView: 6 },
        }}
        className="category-swiper"
      >
        {data.map((category) => (
          <SwiperSlide key={category._id}>
            <Link
              href={`/categories/${category._id}`}
              className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 text-center transition hover:border-brand/30 hover:shadow-md"
            >
              <div className="relative mx-auto mb-3 aspect-square overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="150px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="truncate text-sm font-semibold text-slate-800 group-hover:text-brand">
                {category.name}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
