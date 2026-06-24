import { useRole } from "@/lib/role-context";
import { MOCK_JOBS, MOCK_USERS } from "@/lib/mock-data";
import { JobCard } from "@/components/domain/JobCard";
import { CrewCard } from "@/components/domain/CrewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Saved() {
  const { role } = useRole();
  const isContractor = role === "contractor";

  const defaultTab = isContractor ? "crews" : "jobs";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Saved Items</h1>
        <p className="text-sm text-muted-foreground">Access your bookmarked jobs and crews.</p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="bg-white border border-border h-10 justify-start rounded-md p-1 mb-6">
          <TabsTrigger value="jobs" className="data-[state=active]:bg-gray-50 data-[state=active]:shadow-none text-sm px-6">
            Saved Jobs
          </TabsTrigger>
          <TabsTrigger value="crews" className="data-[state=active]:bg-gray-50 data-[state=active]:shadow-none text-sm px-6">
            Saved Crews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="mt-0">
          <div className="grid md:grid-cols-2 gap-4">
            {MOCK_JOBS.slice(0,2).map(job => (
              <JobCard key={job.id} job={job} showStatus />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crews" className="mt-0">
          <div className="grid md:grid-cols-2 gap-4">
            {MOCK_USERS.filter(u => u.role === "subcontractor").slice(0,1).map(crew => (
              <CrewCard key={crew.id} user={crew} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
