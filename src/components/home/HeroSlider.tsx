"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Fresh Organic Fruits",
    subtitle: "Farm-picked produce delivered to your door",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1600&q=80",
    href: "/products",
    cta: "Shop Now",
  },
  {
    title: "Exotic Vegetables",
    subtitle: "Discover our latest collection of premium vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80",
    href: "/categories",
    cta: "Browse Categories",
  },
  {
    title: "Everyday Essentials",
    subtitle: "Fashion, electronics, and more — all in one cart",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80",
    href: "/products",
    cta: "Explore Deals",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="hero-swiper h-[420px] md:h-[520px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-light">
                  FreshCart
                </p>
                <h1 className="max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-lg text-base text-slate-200 md:text-lg">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="mt-8 inline-flex w-fit items-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
