import { useState } from "react";
import { Redirect } from "wouter";
import { useRole } from "@/lib/role-context";
import { MOCK_USERS } from "@/lib/mock-data";
import { Check, X, ExternalLink, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Admin() {
  const { role } = useRole();
  const [search, setSearch] = useState("");

  // Very simple simulation of admin gate
  if (role === "logged_out") return <Redirect href="/login" />;

  // Gather all pending docs across all subs for the queue
  const pendingDocs = MOCK_USERS
    .filter(u => u.role === "subcontractor")
    .flatMap(u => {
      const docs = [];
      if (u.docs.insurance === "pending") docs.push({ userId: u.id, name: u.company, type: "Liability Insurance", date: "2024-03-14" });
      if (u.docs.licence === "pending") docs.push({ userId: u.id, name: u.company, type: "Trade Licence", date: "2024-03-12" });
      if (u.docs.worksafe === "pending") docs.push({ userId: u.id, name: u.company, type: "WorkSafe Registration", date: "2024-03-13" });
      return docs;
    });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Verification Queue</h1>
        <p className="text-sm text-muted-foreground">Review and approve subcontractor credential submissions.</p>
      </div>

      <div className="bg-white border border-border rounded-md shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center gap-4">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search companies..."
              className="pl-9 bg-gray-50 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            {pendingDocs.length} pending items
          </div>
        </div>

        {pendingDocs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Queue is empty.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Document Type</th>
                  <th className="px-6 py-3">Submitted</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pendingDocs.map((doc, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#0f2a4a]">{doc.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {doc.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-mono">{doc.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="border-border text-muted-foreground h-8 px-2">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-border text-green-600 hover:text-green-700 hover:bg-green-50 h-8 px-2">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-border text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
