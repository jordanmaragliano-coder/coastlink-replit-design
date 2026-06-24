import { useRole } from "@/lib/role-context";
import { Redirect, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateJob() {
  const { role } = useRole();
  const [, setLocation] = useLocation();

  if (role !== "contractor") return <Redirect href="/dashboard" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setLocation("/jobs");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <button 
        onClick={() => history.back()} 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Post a new job</h1>
        <p className="text-sm text-muted-foreground">Define the scope, budget, and requirements to attract the right crews.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-border rounded-md shadow-sm p-6 md:p-8">
        
        {/* Basic Details */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0f2a4a] border-b border-border pb-2">Basic Details</h2>
          
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" required placeholder="e.g. Electrical rough-in, 3200 sqft commercial" className="font-medium" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Trade Type</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="concrete">Concrete</SelectItem>
                  <SelectItem value="framing">Framing</SelectItem>
                  <SelectItem value="drywall">Drywall</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Site Location</Label>
              <Input id="location" required placeholder="City or specific area" />
            </div>
          </div>
        </section>

        {/* Schedule & Budget */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0f2a4a] border-b border-border pb-2">Schedule & Budget</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Expected Start Date</Label>
              <Input id="start" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">Expected End Date</Label>
              <Input id="end" type="date" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Budget Range ($)</Label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                <Input type="number" required placeholder="Min" className="pl-7 font-mono" />
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                <Input type="number" required placeholder="Max" className="pl-7 font-mono" />
              </div>
            </div>
          </div>
        </section>

        {/* Scope */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0f2a4a] border-b border-border pb-2">Scope of Work</h2>
          
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea 
              id="description" 
              required 
              placeholder="Describe the project, specific requirements, and expectations..."
              className="min-h-[160px] resize-y"
            />
          </div>
        </section>

        {/* Requirements */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0f2a4a] border-b border-border pb-2">Requirements</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="req1" defaultChecked disabled />
              <label htmlFor="req1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Verified Account (Insurance, Licence, WorkSafe)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="req2" />
              <label htmlFor="req2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Must provide own materials
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="req3" />
              <label htmlFor="req3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Union shop required
              </label>
            </div>
          </div>
        </section>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-border">
          <Button type="button" variant="ghost" onClick={() => history.back()}>Cancel</Button>
          <Button type="submit" className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white px-8">
            Post Job
          </Button>
        </div>

      </form>
    </div>
  );
}
