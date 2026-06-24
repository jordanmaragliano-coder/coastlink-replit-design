import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "@/components/ui/logo";
import { useRole } from "@/lib/role-context";
import { Bell, User, LayoutDashboard, Store, Briefcase, MessageSquare, BellRing, Bookmark, Settings, FileText, CalendarClock, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { role } = useRole();

  const contractorNav: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Marketplace", href: "/marketplace", icon: Store },
    { label: "My jobs", href: "/jobs", icon: Briefcase },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Notifications", href: "/notifications", icon: BellRing },
    { label: "Saved", href: "/saved", icon: Bookmark },
    { label: "Profile", href: "/profile/edit", icon: User },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const subcontractorNav: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Marketplace", href: "/marketplace", icon: Store },
    { label: "Find work", href: "/find-work", icon: Briefcase },
    { label: "My bids", href: "/my-bids", icon: FileText },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Notifications", href: "/notifications", icon: BellRing },
    { label: "Saved", href: "/saved", icon: Bookmark },
    { label: "Profile", href: "/profile/edit", icon: User },
    { label: "Documents", href: "/documents", icon: ShieldCheck },
    { label: "Availability", href: "/availability", icon: CalendarClock },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const navItems = role === "contractor" ? contractorNav : subcontractorNav;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <header className="h-14 border-b border-border bg-white flex items-center justify-between px-6 shrink-0 sticky top-0 z-40">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground" data-testid="btn-notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Link href="/profile/edit" data-testid="link-header-avatar">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={role === "contractor" ? "" : "/avatar-ryan.png"} />
              <AvatarFallback className="bg-gray-100 text-xs font-medium text-foreground">
                {role === "contractor" ? "MW" : "RT"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col shrink-0 overflow-y-auto">
          <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href || location.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#0f2a4a] bg-gray-50 border-l-[3px] border-[#0f2a4a]"
                      : "text-muted-foreground hover:text-foreground hover:bg-gray-50 border-l-[3px] border-transparent"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
