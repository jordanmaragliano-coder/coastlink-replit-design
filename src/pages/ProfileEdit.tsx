import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRole } from "@/lib/role-context";
import { UploadCloud } from "lucide-react";

export default function ProfileEdit() {
  const { role } = useRole();
  const isContractor = role === "contractor";

  return (
    <div className="max-w-3xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Edit Profile</h1>
        <p className="text-sm text-muted-foreground">Update your company details and public profile information.</p>
      </div>

      <div className="bg-white border border-border rounded-md shadow-sm p-6 md:p-8 space-y-8">
        
        {/* Photo */}
        <section className="flex flex-col md:flex-row gap-6 items-start border-b border-border pb-8">
          <Avatar className="h-24 w-24 rounded bg-gray-100 border border-border shrink-0">
            <AvatarImage src={isContractor ? "" : "/avatar-ryan.png"} />
            <AvatarFallback className="text-2xl">{isContractor ? "MW" : "RT"}</AvatarFallback>
          </Avatar>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0f2a4a]">Profile Photo</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Upload a professional headshot or company logo. JPG or PNG. 500x500px min.
            </p>
            <Button size="sm" variant="outline" className="border-border">
              <UploadCloud className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0f2a4a]">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" defaultValue={isContractor ? "Marcus" : "Ryan"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" defaultValue={isContractor ? "Webb" : "Thorpe"} />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" defaultValue={isContractor ? "Webb Construction Group" : "Thorpe Electrical Services"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="Vancouver, BC" />
            </div>
          </div>
        </section>

        {/* Subcontractor specifics */}
        {!isContractor && (
          <section className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold text-[#0f2a4a]">Trade & Experience</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate">Hourly Rate ($)</Label>
                <Input id="rate" type="number" defaultValue="95" className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialties">Trade Specialties (comma separated)</Label>
                <Input id="specialties" defaultValue="Electrical, Wiring, Lighting" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / About</Label>
              <Textarea 
                id="bio" 
                className="min-h-[120px] resize-y"
                defaultValue="Licensed electrical contractor with over 15 years of commercial and residential experience. Fully insured and bonded. We specialize in fast, precise rough-ins and complex lighting systems."
              />
            </div>
          </section>
        )}

        <div className="pt-4 border-t border-border flex justify-end">
          <Button className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white px-8">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
