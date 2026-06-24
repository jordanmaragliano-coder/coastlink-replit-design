import { ReactNode } from "react";
import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useRole } from "@/lib/role-context";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { role } = useRole();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-border sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/marketplace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-marketplace">
                Marketplace
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-how-it-works">
                How it works
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {role === "logged_out" ? (
              <>
                <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors" data-testid="link-login">
                  Log in
                </Link>
                <Button asChild variant="outline" className="border-[#0f2a4a] text-[#0f2a4a] hover:bg-[#0f2a4a] hover:text-white transition-colors" data-testid="btn-get-started">
                  <Link href="/register">Get started</Link>
                </Button>
              </>
            ) : (
              <Button asChild variant="default" className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white" data-testid="btn-dashboard">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t border-border py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo />
          <div className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} CoastLink. Serious construction hiring.
          </div>
        </div>
      </footer>
    </div>
  );
}
