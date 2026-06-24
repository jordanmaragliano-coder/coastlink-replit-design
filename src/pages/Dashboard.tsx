import { useRole } from "@/lib/role-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "@/components/domain/JobCard";
import { MOCK_JOBS, MOCK_BIDS } from "@/lib/mock-data";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Clock, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { role } = useRole();

  if (role === "logged_out") {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Please log in to view your dashboard.
      </div>
    );
  }

  const isContractor = role === "contractor";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back. Here's what's happening today.</p>
      </div>

      {isContractor ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="Active Jobs" value="3" icon={Clock} />
            <StatCard title="New Bids" value="6" icon={TrendingUp} trend="+2 this week" />
            <StatCard title="Crews Hired" value="12" icon={CheckCircle2} />
            <StatCard title="Open Invites" value="2" icon={ArrowRight} />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#0f2a4a]">Recent Jobs</h2>
                <Link href="/jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground">View all</Link>
              </div>
              <div className="space-y-4">
                {MOCK_JOBS.slice(0, 2).map(job => (
                  <JobCard key={job.id} job={job} showStatus />
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0f2a4a]">Pending Actions</h2>
              <Card className="shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Review bids: Foundation formwork</div>
                      <div className="text-xs text-muted-foreground mt-1">2 new bids received</div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/jobs/j2">Review</Link>
                    </Button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Complete profile</div>
                      <div className="text-xs text-muted-foreground mt-1">Add company logo</div>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href="/settings">Update</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Subcontractor Dashboard */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start gap-3 mb-6">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-800">Verification Pending</h3>
              <p className="text-sm text-amber-700 mt-1">Your trade license is still under review. You can bid on jobs, but the verified badge won't appear on your profile yet.</p>
              <Button size="sm" variant="outline" className="mt-3 bg-white border-amber-200 text-amber-800 hover:bg-amber-100" asChild>
                <Link href="/documents">Check status</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="Active Bids" value="2" icon={Clock} />
            <StatCard title="Jobs Won" value="8" icon={CheckCircle2} />
            <StatCard title="Total Earned" value="$142k" icon={TrendingUp} />
            <StatCard title="Profile views" value="34" icon={ArrowRight} trend="Past 30 days" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#0f2a4a]">Recent Bids</h2>
                <Link href="/my-bids" className="text-sm font-medium text-muted-foreground hover:text-foreground">View all</Link>
              </div>
              <Card className="shadow-sm">
                <div className="divide-y divide-border">
                  {MOCK_BIDS.map(bid => {
                    const job = MOCK_JOBS.find(j => j.id === bid.jobId);
                    return (
                      <div key={bid.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div>
                          <div className="text-sm font-medium text-[#0f2a4a] mb-1">{job?.title}</div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                            <span>${(bid.amount/1000).toFixed(1)}k</span>
                            <span>•</span>
                            <span>{bid.timelineDays} days</span>
                            <span>•</span>
                            <span>Submitted {bid.dateSubmitted}</span>
                          </div>
                        </div>
                        <div className="shrink-0 ml-4">
                          <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                            {bid.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0f2a4a]">Recommended Jobs</h2>
              <div className="space-y-4">
                {MOCK_JOBS.filter(j => j.status === "open").map(job => (
                  <Card key={job.id} className="p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">{job.trade}</div>
                    <div className="text-sm font-medium text-[#0f2a4a] leading-tight mb-2 line-clamp-2">{job.title}</div>
                    <div className="text-xs text-muted-foreground mb-3">{job.location}</div>
                    <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                      <Link href="/find-work">View job</Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#0f2a4a]">{value}</div>
        {trend && <p className="text-xs text-muted-foreground mt-1 font-mono">{trend}</p>}
      </CardContent>
    </Card>
  );
}
