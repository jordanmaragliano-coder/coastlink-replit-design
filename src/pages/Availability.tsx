import { useRole } from "@/lib/role-context";
import { Redirect } from "wouter";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CalendarClock, MapPin } from "lucide-react";

export default function Availability() {
  const { role } = useRole();
  const [isAvailable, setIsAvailable] = useState(true);

  if (role !== "subcontractor") return <Redirect href="/dashboard" />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Availability</h1>
        <p className="text-sm text-muted-foreground">Manage your working schedule and location preferences.</p>
      </div>

      <div className="bg-white border border-border rounded-md shadow-sm p-6">
        <div className="flex items-start justify-between border-b border-border pb-6 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#0f2a4a] flex items-center gap-2 mb-1">
              <CalendarClock className="w-5 h-5 text-muted-foreground" />
              Current Status
            </h2>
            <p className="text-sm text-muted-foreground">
              Let contractors know if you are actively taking on new projects.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${isAvailable ? 'text-[#16a34a]' : 'text-muted-foreground'}`}>
              {isAvailable ? "Available for work" : "Not available"}
            </span>
            <Switch 
              checked={isAvailable} 
              onCheckedChange={setIsAvailable} 
            />
          </div>
        </div>

        <div className={`space-y-6 transition-opacity ${!isAvailable ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Available From</Label>
              <Input type="date" defaultValue="2024-03-20" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label>Available Until (Optional)</Label>
              <Input type="date" className="bg-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#0f2a4a] border-b border-border pb-2">Travel Preferences</h3>
            
            <div className="space-y-2">
              <Label>Base Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue="Vancouver, BC" className="pl-9 bg-white" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Maximum Travel Distance</Label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  defaultValue="25" 
                  className="w-full accent-[#0f2a4a]" 
                />
                <span className="font-mono text-sm font-medium text-[#0f2a4a] w-12 text-right">25 km</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white">Save Preferences</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
