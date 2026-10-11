"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { numOfCartItems } = useCart();
  const { wishlist } = useWishlist();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const keyword = query.trim();
    router.push(keyword ? `/products?keyword=${encodeURIComponent(keyword)}` : "/products");
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="shrink-0 text-2xl font-bold tracking-tight">
          <span className="text-brand">Fresh</span>
          <span className="text-slate-900">Cart</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-brand/10 text-brand"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={onSearch} className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link
            href="/wishlist"
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-brand"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-brand"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {numOfCartItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {numOfCartItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                href="/allorders"
                className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-brand"
                aria-label="Orders"
                title="My Orders"
              >
                <Package className="h-5 w-5" />
              </Link>
              <span className="hidden max-w-[120px] truncate px-2 text-sm font-medium text-slate-700 xl:block">
                Hi, {user?.name?.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl p-2.5 text-slate-600 transition hover:bg-red-50 hover:text-red-500"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark sm:inline-flex"
            >
              <User className="h-4 w-4" />
              Login
            </Link>
          )}

          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="relative mb-4 md:hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand focus:bg-white"
            />
          </form>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === link.href
                    ? "bg-brand/10 text-brand"
                    : "text-slate-700 hover:bg-slate-50",
                )}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/allorders"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  My Orders
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand hover:bg-brand/10"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
