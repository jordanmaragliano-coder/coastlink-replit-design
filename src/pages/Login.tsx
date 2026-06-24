import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { useRole } from "@/lib/role-context";

export default function Login() {
  const [, setLocation] = useLocation();
  const { setRole } = useRole();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login by setting role based on email hint or defaulting to contractor
    const email = (e.currentTarget as HTMLFormElement).email.value.toLowerCase();
    if (email.includes("sub")) {
      setRole("subcontractor");
    } else {
      setRole("contractor");
    }
    setLocation("/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border border-border rounded-md shadow-sm p-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <h1 className="text-2xl font-bold text-[#0f2a4a] text-center mb-2">Welcome back</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">Log in to your CoastLink account</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" name="email" type="email" placeholder="name@company.com" required className="rounded-sm" data-testid="input-login-email" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-[#0f2a4a] hover:underline">Forgot password?</a>
            </div>
            <Input id="password" type="password" required className="rounded-sm" data-testid="input-login-password" />
          </div>
          
          <Button type="submit" className="w-full bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white rounded-sm mt-6" data-testid="btn-login-submit">
            Log in
          </Button>
        </form>
        
        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#0f2a4a] font-medium hover:underline" data-testid="link-register">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
