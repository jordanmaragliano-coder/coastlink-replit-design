import { MapPin, Clock, Users } from "lucide-react";
import { Link } from "wouter";
import { Job } from "@/lib/mock-data";
import { StatusChip } from "@/components/ui/badges";

interface JobCardProps {
  job: Job;
  showStatus?: boolean;
  action?: React.ReactNode;
}

export function JobCard({ job, showStatus, action }: JobCardProps) {
  const budgetFormatted = `$${(job.budgetMin / 1000).toFixed(0)}k–$${(job.budgetMax / 1000).toFixed(0)}k`;

  return (
    <div className="bg-white border border-border rounded-md shadow-sm p-5 hover:shadow-md transition-shadow" data-testid={`card-job-${job.id}`}>
      <div className="flex justify-between items-start mb-3 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{job.trade}</span>
            {showStatus && <StatusChip status={job.status} />}
          </div>
          <h3 className="text-base font-semibold text-[#0f2a4a] leading-tight">
            {job.title}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-sm font-medium text-[#0f2a4a] bg-gray-50 px-2 py-1 rounded border border-border">
            {budgetFormatted}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {job.description}
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Posted {job.postedDate}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {job.bidCount} {job.bidCount === 1 ? 'bid' : 'bids'}
          </div>
        </div>
        
        {action || (
          <Link href={`/jobs/${job.id}`} className="text-sm font-medium text-[#0f2a4a] hover:underline" data-testid={`link-view-job-${job.id}`}>
            View details &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
