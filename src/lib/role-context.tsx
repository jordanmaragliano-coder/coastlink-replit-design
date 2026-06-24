import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Role = "logged_out" | "contractor" | "subcontractor";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem("coastlink_role");
    return (saved as Role) || "logged_out";
  });

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem("coastlink_role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
