import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            <span className="text-brand-light">Fresh</span>Cart
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            Your trusted destination for fresh groceries, fashion, and
            everyday essentials — delivered with care.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="transition hover:text-brand-light">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="transition hover:text-brand-light">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="transition hover:text-brand-light">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Account
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/login" className="transition hover:text-brand-light">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="transition hover:text-brand-light">
                Register
              </Link>
            </li>
            <li>
              <Link href="/cart" className="transition hover:text-brand-light">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="transition hover:text-brand-light">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
              123 Commerce Street, New York, NY 10001
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand-light" />
              +1 (800) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand-light" />
              support@freshcart.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} FreshCart. Built with Next.js & Route API.
      </div>
    </footer>
  );
}
