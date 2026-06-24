import { useRole } from "@/lib/role-context";

export function DevRoleSwitcher() {
  const { role, setRole } = useRole();

  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-border shadow-lg rounded-full px-3 py-2 flex items-center gap-2 text-xs font-mono">
      <span className="text-muted-foreground font-semibold">DEV ROLE:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        className="bg-gray-50 border border-border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#0f2a4a]"
        data-testid="select-dev-role"
      >
        <option value="logged_out">Logged out</option>
        <option value="contractor">Contractor</option>
        <option value="subcontractor">Subcontractor</option>
      </select>
    </div>
  );
}
