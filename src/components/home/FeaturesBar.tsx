import { Headphones, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "On orders over 500 EGP",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    text: "30-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "100% protected checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "We're here to help",
  },
];

export default function FeaturesBar() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
