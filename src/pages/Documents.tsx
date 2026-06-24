import { useRole } from "@/lib/role-context";
import { Redirect } from "wouter";
import { ShieldAlert, ShieldCheck, UploadCloud, FileText, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Documents() {
  const { role } = useRole();

  if (role !== "subcontractor") return <Redirect href="/dashboard" />;

  const docs = [
    {
      id: "insurance",
      title: "General Liability Insurance",
      description: "Minimum $2M coverage required.",
      status: "approved",
      lastUpdated: "2024-01-15",
    },
    {
      id: "licence",
      title: "Trade/Business Licence",
      description: "Current municipal or provincial trade licence.",
      status: "pending",
      lastUpdated: "2024-03-12",
    },
    {
      id: "worksafe",
      title: "WorkSafe/WCB Registration",
      description: "Clearance letter showing active coverage.",
      status: "approved",
      lastUpdated: "2024-01-15",
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Documents & Verification</h1>
        <p className="text-sm text-muted-foreground">Upload your credentials to earn the Verified badge and increase your chances of winning bids.</p>
      </div>

      <div className="bg-[#f0fdf4] border border-[#16a34a]/30 p-4 rounded-md flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-[#16a34a] shrink-0 mt-0.5" />
        <div>
          <h3 className="text-base font-semibold text-[#16a34a]">The Verified Advantage</h3>
          <p className="text-sm text-[#16a34a]/80 mt-1">
            Contractors are 4x more likely to award jobs to verified crews. Keep your documents up to date to maintain your status.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {docs.map(doc => (
          <div key={doc.id} className="bg-white border border-border rounded-md shadow-sm overflow-hidden">
            <div className="p-5 flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-gray-50 border border-border flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0f2a4a] flex items-center gap-2">
                    {doc.title}
                    {doc.status === "approved" && <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />}
                    {doc.status === "pending" && <Clock className="w-4 h-4 text-amber-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-3 shrink-0 ml-14 md:ml-0">
                <div className="flex items-center gap-2">
                  <DocStatus status={doc.status} />
                </div>
                {doc.status !== "none" && (
                  <div className="text-xs text-muted-foreground font-mono">
                    Updated {doc.lastUpdated}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 border-t border-border px-5 py-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">PDF, JPG, or PNG up to 10MB</span>
              <Button size="sm" variant={doc.status === "approved" ? "outline" : "default"} className={doc.status !== "approved" ? "bg-[#0f2a4a] text-white" : ""}>
                <UploadCloud className="w-4 h-4 mr-2" />
                {doc.status === "none" ? "Upload document" : "Replace document"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocStatus({ status }: { status: string }) {
  if (status === "approved") {
    return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-[#f0fdf4] text-[#16a34a] border border-[#16a34a]/20 uppercase tracking-wider">Approved</span>;
  }
  if (status === "pending") {
    return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">Pending Review</span>;
  }
  if (status === "rejected") {
    return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200 uppercase tracking-wider">Rejected</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wider">Not Uploaded</span>;
}
