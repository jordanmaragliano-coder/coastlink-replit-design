import { useState } from "react";
import { useRole } from "@/lib/role-context";
import { MOCK_JOBS, MOCK_USERS } from "@/lib/mock-data";
import { JobCard } from "@/components/domain/JobCard";
import { CrewCard } from "@/components/domain/CrewCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  const { role } = useRole();
  const [search, setSearch] = useState("");

  const isContractor = role === "contractor";
  
  // If contractor, show crews. Otherwise (subcontractor or logged out), show jobs.
  const title = isContractor ? "Find Crews" : "Find Work";
  const description = isContractor 
    ? "Browse verified subcontractors available for your projects." 
    : "Discover and bid on commercial and residential projects.";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="bg-white border border-border p-3 rounded-md shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={isContractor ? "Search by trade, company, or skills..." : "Search by job title, trade, or keywords..."}
            className="pl-9 bg-gray-50 border-transparent focus-visible:bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-gray-50 border-transparent">
              <SelectValue placeholder="Trade type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trades</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="concrete">Concrete</SelectItem>
              <SelectItem value="drywall">Drywall</SelectItem>
              <SelectItem value="framing">Framing</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-gray-50 border-transparent">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Location</SelectItem>
              <SelectItem value="vancouver">Vancouver</SelectItem>
              <SelectItem value="burnaby">Burnaby</SelectItem>
              <SelectItem value="surrey">Surrey</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-border text-foreground">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            More
          </Button>
        </div>
      </div>

      {role === "logged_out" && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex items-center justify-between">
          <div className="text-sm text-blue-900">
            <strong>Ready to bid?</strong> Create a free account to submit proposals and message contractors directly.
          </div>
          <Button asChild size="sm" className="bg-[#0f2a4a] text-white">
            <a href="/register">Sign up to bid</a>
          </Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-4">
        {isContractor ? (
          // Contractor view: List of crews
          MOCK_USERS.filter(u => u.role === "subcontractor").map(crew => (
            <CrewCard key={crew.id} user={crew} />
          ))
        ) : (
          // Subcontractor/Logged out view: List of jobs
          MOCK_JOBS.filter(j => j.status === "open" || j.status === "reviewing").map(job => (
            <JobCard key={job.id} job={job} showStatus />
          ))
        )}
      </div>
    </div>
  );
}
