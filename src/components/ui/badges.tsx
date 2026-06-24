import { ShieldCheck } from "lucide-react";

export function VerifiedBadge({ show = true }: { show?: boolean }) {
  if (!show) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#f0fdf4] text-[#16a34a] border border-[#16a34a]/20" data-testid="badge-verified">
      <ShieldCheck className="w-3.5 h-3.5" />
      Verified
    </span>
  );
}

export function StatusChip({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700 border-gray-200",
    open: "bg-blue-50 text-blue-700 border-blue-200",
    reviewing: "bg-amber-50 text-amber-700 border-amber-200",
    awarded: "bg-green-50 text-green-700 border-green-200",
    completed: "bg-gray-100 text-gray-700 border-gray-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
    declined: "bg-red-50 text-red-700 border-red-200",
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);
  const style = styles[status.toLowerCase()] || styles.draft;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style}`} data-testid={`chip-status-${status}`}>
      {label}
    </span>
  );
}
