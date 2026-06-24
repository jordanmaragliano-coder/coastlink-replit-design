import { useRole } from "@/lib/role-context";
import { Link, Redirect, useParams } from "wouter";
import { MOCK_JOBS, MOCK_BIDS, MOCK_USERS } from "@/lib/mock-data";
import { StatusChip, VerifiedBadge } from "@/components/ui/badges";
import { MapPin, Clock, Users, ArrowLeft, MoreHorizontal, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function JobDetail() {
  const { role } = useRole();
  const { id } = useParams<{ id: string }>();
  
  if (role !== "contractor") return <Redirect href="/dashboard" />;
  
  const job = MOCK_JOBS.find(j => j.id === id);
  if (!job) return <div>Job not found</div>;

  const bids = MOCK_BIDS.filter(b => b.jobId === job.id);
  const budgetFormatted = `$${(job.budgetMin / 1000).toFixed(0)}k–$${(job.budgetMax / 1000).toFixed(0)}k`;

  return (
    <div className="space-y-6">
      <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to jobs
      </Link>
      
      {/* Job Header */}
      <div className="bg-white border border-border rounded-md shadow-sm p-6">
        <div className="flex justify-between items-start mb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{job.trade}</span>
              <StatusChip status={job.status} />
            </div>
            <h1 className="text-2xl font-bold text-[#0f2a4a] leading-tight mb-2">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Posted {job.postedDate}
              </div>
              <div className="flex items-center gap-1 font-mono text-[#0f2a4a] font-medium bg-gray-50 px-2 py-0.5 rounded border border-border">
                {budgetFormatted}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" className="border-border">Edit job</Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></Button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-[#0f2a4a] mb-2">Description</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.description}</p>
        </div>
      </div>

      {/* Bids Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0f2a4a]">Bids ({bids.length})</h2>
        </div>
        
        {bids.length === 0 ? (
          <div className="bg-gray-50 border border-border rounded-md p-8 text-center text-muted-foreground">
            No bids received yet.
          </div>
        ) : (
          <div className="space-y-4">
            {bids.map(bid => {
              const crew = MOCK_USERS.find(u => u.id === bid.subcontractorId);
              if (!crew) return null;
              
              return (
                <div key={bid.id} className="bg-white border border-border rounded-md shadow-sm p-5 flex flex-col md:flex-row gap-6">
                  {/* Crew Info */}
                  <div className="md:w-1/3 shrink-0 border-r border-border md:pr-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-10 w-10 rounded">
                        <AvatarImage src={crew.avatarUrl} />
                        <AvatarFallback>{crew.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={`/profile/${crew.id}`} className="font-semibold text-[#0f2a4a] hover:underline flex items-center gap-1">
                          {crew.company}
                        </Link>
                        <div className="text-xs text-muted-foreground">{crew.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <VerifiedBadge show={crew.verified} />
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="font-medium text-foreground">{crew.rating}</span>
                        <span>({crew.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bid Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-mono text-xl font-bold text-[#0f2a4a] mb-1">${bid.amount.toLocaleString()}</div>
                        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Est. timeline: {bid.timelineDays} days
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-border">
                          <MessageSquare className="w-3.5 h-3.5 mr-2" /> Message
                        </Button>
                        <Button size="sm" className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white">
                          Award
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded p-3 text-sm text-muted-foreground">
                      "{bid.message}"
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
