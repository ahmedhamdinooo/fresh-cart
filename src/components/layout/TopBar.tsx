import { Mail, Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-slate-900 text-white md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm lg:px-6">
        <div className="flex items-center gap-5">
          <a
            href="tel:+18001234567"
            className="inline-flex items-center gap-2 transition hover:text-brand-light"
          >
            <Phone className="h-3.5 w-3.5" />
            +1 (800) 123-4567
          </a>
          <a
            href="mailto:support@freshcart.com"
            className="inline-flex items-center gap-2 transition hover:text-brand-light"
          >
            <Mail className="h-3.5 w-3.5" />
            support@freshcart.com
          </a>
        </div>
        <p className="text-slate-300">Free shipping on orders over 500 EGP</p>
      </div>
    </div>
  );
}
