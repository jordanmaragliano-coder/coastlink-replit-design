import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { useRole } from "@/lib/role-context";
import { Briefcase, HardHat } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const { setRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<"contractor" | "subcontractor" | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      setRole(selectedRole);
      setLocation("/dashboard");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-xl bg-white border border-border rounded-md shadow-sm p-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <h1 className="text-2xl font-bold text-[#0f2a4a] text-center mb-2">Create an account</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">Join the professional construction network</p>
        
        {!selectedRole ? (
          <div className="grid md:grid-cols-2 gap-4">
            <button 
              onClick={() => setSelectedRole("contractor")}
              className="flex flex-col items-center text-center p-6 border-2 border-border rounded-md hover:border-[#0f2a4a] hover:bg-gray-50 transition-colors"
              data-testid="select-role-contractor"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-[#0f2a4a]" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">I'm a general contractor</h3>
              <p className="text-sm text-muted-foreground">I want to post jobs and hire verified crews.</p>
            </button>
            
            <button 
              onClick={() => setSelectedRole("subcontractor")}
              className="flex flex-col items-center text-center p-6 border-2 border-border rounded-md hover:border-[#0f2a4a] hover:bg-gray-50 transition-colors"
              data-testid="select-role-subcontractor"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <HardHat className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">I'm a subcontractor</h3>
              <p className="text-sm text-muted-foreground">I want to find work and bid on projects.</p>
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 border border-border rounded-sm text-sm">
              <span className="text-muted-foreground">Signing up as:</span>
              <span className="font-semibold capitalize text-[#0f2a4a]">{selectedRole}</span>
              <button 
                type="button" 
                onClick={() => setSelectedRole(null)}
                className="ml-auto text-xs underline text-muted-foreground hover:text-foreground"
              >
                Change
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" required className="rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" required className="rounded-sm" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" required className="rounded-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" placeholder="name@company.com" required className="rounded-sm" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="rounded-sm" />
            </div>
            
            <Button type="submit" className="w-full bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white rounded-sm mt-6" data-testid="btn-register-submit">
              Create account
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        )}
        
        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0f2a4a] font-medium hover:underline" data-testid="link-login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
