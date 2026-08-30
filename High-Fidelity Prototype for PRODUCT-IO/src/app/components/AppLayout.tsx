import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Home,
  Factory,
  Package,
  DollarSign,
  Search,
  CheckCircle,
  Wrench,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { RoleBadge, UserRole } from "./RoleBadge";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Factory, label: "Producción", path: "/production" },
  { icon: Package, label: "Insumos", path: "/supplies" },
  { icon: DollarSign, label: "Costeo", path: "/costing" },
  { icon: Search, label: "Trazabilidad", path: "/traceability" },
  { icon: CheckCircle, label: "Calidad", path: "/quality" },
  { icon: Wrench, label: "Mantenimiento", path: "/maintenance" },
  { icon: BarChart3, label: "Reportes", path: "/reports" },
  { icon: Settings, label: "Administración", path: "/admin" },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{ name: string; role: UserRole } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
                  <span className="text-sm font-bold">P</span>
                </div>
                <span className="font-bold">PRODUCT-IO</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="text-sidebar-foreground hover:bg-sidebar-accent mx-auto"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-xs">
                3
              </Badge>
            </Button>

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <div className="flex justify-end">
                  <RoleBadge role={user.role} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
