import Link from "next/link";
import Button from "./Button";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {description && <p className="max-w-md text-sm text-slate-500">{description}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="mt-2">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
