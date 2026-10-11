import { cn } from "@/lib/utils";

export default function LoadingSpinner({
  className,
  label = "Loading...",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-3",
        className,
      )}
      role="status"
      aria-label={label}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
