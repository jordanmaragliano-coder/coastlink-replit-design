import { Star, MapPin } from "lucide-react";
import { Link } from "wouter";
import { User } from "@/lib/mock-data";
import { VerifiedBadge } from "@/components/ui/badges";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CrewCardProps {
  user: User;
  action?: React.ReactNode;
}

export function CrewCard({ user, action }: CrewCardProps) {
  if (user.role !== "subcontractor") return null;

  return (
    <div className="bg-white border border-border rounded-md shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col" data-testid={`card-crew-${user.id}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 rounded bg-gray-100 border border-border">
            <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
            <AvatarFallback className="rounded font-medium text-muted-foreground">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-[#0f2a4a] leading-tight">
                {user.company}
              </h3>
              <VerifiedBadge show={user.verified} />
            </div>
            <div className="text-sm text-muted-foreground">
              {user.name}
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-sm font-medium text-[#0f2a4a]">
            ${user.hourlyRate}/hr
          </div>
          {user.availability && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#f0fdf4] text-[#16a34a] border border-[#16a34a]/20 uppercase tracking-wider">
              Available
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {user.tradeSpecialties?.map((trade) => (
          <span key={trade} className="font-mono text-xs text-muted-foreground bg-gray-50 border border-border px-2 py-0.5 rounded">
            {trade}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {user.location}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-medium text-foreground">{user.rating}</span>
            <span>({user.reviewCount})</span>
          </div>
        </div>
        
        {action || (
          <Link href={`/profile/${user.id}`} className="text-sm font-medium text-[#0f2a4a] hover:underline" data-testid={`link-view-crew-${user.id}`}>
            View profile &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
