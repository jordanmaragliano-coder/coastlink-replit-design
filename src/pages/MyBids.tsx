import { useRole } from "@/lib/role-context";
import { Redirect, Link } from "wouter";
import { MOCK_BIDS, MOCK_JOBS } from "@/lib/mock-data";
import { StatusChip } from "@/components/ui/badges";
import { Clock, MessageSquare, ChevronRight, FileText } from "lucide-react";

export default function MyBids() {
  const { role } = useRole();

  if (role !== "subcontractor") return <Redirect href="/dashboard" />;

  // In a real app we'd filter by logged-in user's ID
  const myBids = MOCK_BIDS.filter(b => b.subcontractorId === "s1");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">My Bids</h1>
        <p className="text-sm text-muted-foreground">Track the status of your submitted proposals.</p>
      </div>

      <div className="bg-white border border-border rounded-md shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {myBids.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
              <FileText className="w-8 h-8 text-gray-300 mb-3" />
              <p>You haven't submitted any bids yet.</p>
              <Link href="/find-work" className="text-[#0f2a4a] font-medium hover:underline mt-2">
                Find jobs to bid on
              </Link>
            </div>
          ) : (
            myBids.map(bid => {
              const job = MOCK_JOBS.find(j => j.id === bid.jobId);
              if (!job) return null;

              return (
                <div key={bid.id} className="p-5 flex flex-col md:flex-row gap-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusChip status={bid.status} />
                      <span className="text-xs text-muted-foreground font-mono">Submitted {bid.dateSubmitted}</span>
                    </div>
                    <h3 className="text-base font-semibold text-[#0f2a4a] mb-1">
                      {job.title}
                    </h3>
                    <div className="text-sm text-muted-foreground mb-3">
                      Contractor: {job.contractorName}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm font-medium">
                      <div className="flex items-center gap-1.5 bg-white border border-border px-2 py-1 rounded font-mono">
                        <span className="text-muted-foreground">Bid:</span>
                        <span className="text-[#0f2a4a]">${bid.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white border border-border px-2 py-1 rounded font-mono">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-[#0f2a4a]">{bid.timelineDays} days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex items-center justify-end md:flex-col gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-border">
                    <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#0f2a4a] px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button className="flex items-center gap-1 text-sm font-medium text-[#0f2a4a] px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 md:ml-auto">
                      View details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
