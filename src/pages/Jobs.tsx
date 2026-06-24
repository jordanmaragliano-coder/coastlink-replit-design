import { useRole } from "@/lib/role-context";
import { Link, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/domain/JobCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Jobs() {
  const { role } = useRole();

  if (role !== "contractor") return <Redirect href="/dashboard" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">My Jobs</h1>
          <p className="text-sm text-muted-foreground">Manage your posted projects and track bids.</p>
        </div>
        <Button asChild className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white">
          <Link href="/jobs/new">
            <Plus className="w-4 h-4 mr-2" />
            Post a job
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white border border-border h-10 w-full justify-start rounded-md p-1 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-50 data-[state=active]:shadow-none text-sm">All Jobs</TabsTrigger>
          <TabsTrigger value="open" className="data-[state=active]:bg-gray-50 data-[state=active]:shadow-none text-sm">Open ({MOCK_JOBS.filter(j => j.status === 'open' || j.status === 'reviewing').length})</TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-gray-50 data-[state=active]:shadow-none text-sm">Drafts</TabsTrigger>
          <TabsTrigger value="awarded" className="data-[state=active]:bg-gray-50 data-[state=active]:shadow-none text-sm">Awarded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid md:grid-cols-2 gap-4">
            {MOCK_JOBS.map(job => (
              <JobCard key={job.id} job={job} showStatus />
            ))}
          </div>
        </TabsContent>
        
        {/* Other tab contents would filter accordingly */}
      </Tabs>
    </div>
  );
}
