import { useState } from "react";
import { useRole } from "@/lib/role-context";
import { Redirect } from "wouter";
import { MOCK_JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/domain/JobCard";
import { Input } from "@/components/ui/input";
import { Search, MapPin, SlidersHorizontal, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FindWork() {
  const { role } = useRole();
  const [search, setSearch] = useState("");
  const [submittedBidId, setSubmittedBidId] = useState<string | null>(null);

  if (role !== "subcontractor") return <Redirect href="/dashboard" />;

  const jobs = MOCK_JOBS.filter(j => j.status === "open");

  return (
    <div className="flex gap-6 relative">
      {/* Filters Sidebar */}
      <div className="hidden md:block w-64 shrink-0 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0f2a4a] mb-4">Find Work</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Keywords..."
                  className="pl-9 bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trade</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All trades</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="concrete">Concrete</SelectItem>
                  <SelectItem value="drywall">Drywall</SelectItem>
                  <SelectItem value="framing">Framing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="City or region" className="pl-9 bg-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Budget Range</Label>
              <Select defaultValue="any">
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any budget</SelectItem>
                  <SelectItem value="under10k">Under $10k</SelectItem>
                  <SelectItem value="10k-50k">$10k - $50k</SelectItem>
                  <SelectItem value="over50k">Over $50k</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white mt-2">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 space-y-4">
        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <Button variant="outline" className="w-full justify-start border-border bg-white text-foreground">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Showing {jobs.length} open jobs
        </div>

        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            action={
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white">
                    Apply to job
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md w-full bg-white overflow-y-auto border-l border-border">
                  <SheetHeader className="mb-6 border-b border-border pb-4 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{job.trade}</span>
                    </div>
                    <SheetTitle className="text-xl font-bold text-[#0f2a4a]">{job.title}</SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/>{job.location}</span>
                      <span className="font-mono text-[#0f2a4a] font-medium bg-gray-50 px-2 py-0.5 rounded border border-border">
                        ${(job.budgetMin/1000).toFixed(0)}k–${(job.budgetMax/1000).toFixed(0)}k
                      </span>
                    </SheetDescription>
                  </SheetHeader>
                  
                  {submittedBidId === job.id ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 border border-green-100">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0f2a4a] mb-2">Bid submitted!</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Your proposal has been sent to {job.contractorName}.
                      </p>
                      <Button variant="outline" className="border-border" onClick={() => setSubmittedBidId(null)}>
                        Back to job
                      </Button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => { e.preventDefault(); setSubmittedBidId(job.id); }} 
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`amount-${job.id}`}>Bid Amount ($)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                          <Input id={`amount-${job.id}`} type="number" required placeholder="0.00" className="pl-7 font-mono" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`timeline-${job.id}`}>Estimated Timeline (days)</Label>
                        <Input id={`timeline-${job.id}`} type="number" required placeholder="e.g. 14" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`message-${job.id}`}>Message to Contractor</Label>
                        <Textarea 
                          id={`message-${job.id}`} 
                          required 
                          placeholder="Introduce your team and explain why you're a good fit..."
                          className="min-h-[120px] resize-none"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white">
                        Submit Bid
                      </Button>
                    </form>
                  )}
                </SheetContent>
              </Sheet>
            }
          />
        ))}
      </div>
    </div>
  );
}
