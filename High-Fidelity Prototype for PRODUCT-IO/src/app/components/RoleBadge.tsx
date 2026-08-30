import { Badge } from "./ui/badge";

export type UserRole =
  | "operator"
  | "quality"
  | "maintenance"
  | "accountant"
  | "manager"
  | "admin";

interface RoleBadgeProps {
  role: UserRole;
}

const roleConfig = {
  operator: {
    label: "Operario de Línea",
    className: "bg-blue-400 text-white hover:bg-blue-500",
  },
  quality: {
    label: "Encargado de Calidad",
    className: "bg-success text-success-foreground hover:bg-success/90",
  },
  maintenance: {
    label: "Encargado de Mantenimiento",
    className: "bg-accent text-accent-foreground hover:bg-accent/90",
  },
  accountant: {
    label: "Contador / Analista",
    className: "bg-purple-500 text-white hover:bg-purple-600",
  },
  manager: {
    label: "Gerente de Producción",
    className: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  admin: {
    label: "Administrador",
    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role];
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
