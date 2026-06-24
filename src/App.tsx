import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/lib/role-context";
import { DevRoleSwitcher } from "@/components/ui/dev-role-switcher";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Marketplace from "@/pages/Marketplace";
import Dashboard from "@/pages/Dashboard";
import Jobs from "@/pages/Jobs";
import JobDetail from "@/pages/JobDetail";
import CreateJob from "@/pages/CreateJob";
import FindWork from "@/pages/FindWork";
import MyBids from "@/pages/MyBids";
import Documents from "@/pages/Documents";
import Availability from "@/pages/Availability";
import Messages from "@/pages/Messages";
import Notifications from "@/pages/Notifications";
import Saved from "@/pages/Saved";
import ProfileDetail from "@/pages/ProfileDetail";
import ProfileEdit from "@/pages/ProfileEdit";
import Settings from "@/pages/Settings";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => <PublicLayout><Home /></PublicLayout>}
      </Route>
      <Route path="/login">
        {() => <PublicLayout><Login /></PublicLayout>}
      </Route>
      <Route path="/register">
        {() => <PublicLayout><Register /></PublicLayout>}
      </Route>
      
      {/* Signed-in routes */}
      <Route path="/marketplace">
        {() => <AppLayout><Marketplace /></AppLayout>}
      </Route>
      <Route path="/dashboard">
        {() => <AppLayout><Dashboard /></AppLayout>}
      </Route>
      <Route path="/jobs">
        {() => <AppLayout><Jobs /></AppLayout>}
      </Route>
      <Route path="/jobs/new">
        {() => <AppLayout><CreateJob /></AppLayout>}
      </Route>
      <Route path="/jobs/:id">
        {() => <AppLayout><JobDetail /></AppLayout>}
      </Route>
      <Route path="/find-work">
        {() => <AppLayout><FindWork /></AppLayout>}
      </Route>
      <Route path="/my-bids">
        {() => <AppLayout><MyBids /></AppLayout>}
      </Route>
      <Route path="/documents">
        {() => <AppLayout><Documents /></AppLayout>}
      </Route>
      <Route path="/availability">
        {() => <AppLayout><Availability /></AppLayout>}
      </Route>
      <Route path="/messages">
        {() => <AppLayout><Messages /></AppLayout>}
      </Route>
      <Route path="/notifications">
        {() => <AppLayout><Notifications /></AppLayout>}
      </Route>
      <Route path="/saved">
        {() => <AppLayout><Saved /></AppLayout>}
      </Route>
      <Route path="/profile/edit">
        {() => <AppLayout><ProfileEdit /></AppLayout>}
      </Route>
      <Route path="/profile/:id">
        {() => <AppLayout><ProfileDetail /></AppLayout>}
      </Route>
      <Route path="/settings">
        {() => <AppLayout><Settings /></AppLayout>}
      </Route>
      <Route path="/admin">
        {() => <AppLayout><Admin /></AppLayout>}
      </Route>
      
      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <RoleProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <DevRoleSwitcher />
        </TooltipProvider>
      </QueryClientProvider>
    </RoleProvider>
  );
}

export default App;
