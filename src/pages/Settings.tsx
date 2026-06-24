import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="max-w-3xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Account Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your login details and notification preferences.</p>
      </div>

      <div className="bg-white border border-border rounded-md shadow-sm divide-y divide-border">
        
        {/* Email & Password */}
        <section className="p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-semibold text-[#0f2a4a]">Login Details</h2>
          
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="user@company.com" disabled className="bg-gray-50 text-muted-foreground" />
              <p className="text-xs text-muted-foreground mt-1">To change your email, please contact support.</p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="current-pwd">Current Password</Label>
              <Input id="current-pwd" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pwd">New Password</Label>
              <Input id="new-pwd" type="password" />
            </div>
            <Button className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white mt-2">Update Password</Button>
          </div>
        </section>

        {/* Notifications */}
        <section className="p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-semibold text-[#0f2a4a]">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-md">
              <div>
                <div className="font-medium text-foreground">Email Notifications</div>
                <div className="text-sm text-muted-foreground">Receive daily digests and important alerts via email.</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-md">
              <div>
                <div className="font-medium text-foreground">SMS Alerts</div>
                <div className="text-sm text-muted-foreground">Get text messages for new bids and messages.</div>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="p-6 md:p-8 space-y-4 bg-red-50/30">
          <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">Delete Account</Button>
        </section>

      </div>
    </div>
  );
}
