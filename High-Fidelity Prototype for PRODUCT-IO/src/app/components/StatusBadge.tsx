import { Badge } from "./ui/badge";

export type BatchStatus = "active" | "in_progress" | "closed" | "alert";

interface StatusBadgeProps {
  status: BatchStatus;
}

const statusConfig = {
  active: {
    label: "Activo",
    className: "bg-success text-success-foreground hover:bg-success/90",
  },
  in_progress: {
    label: "En Proceso",
    className: "bg-accent text-accent-foreground hover:bg-accent/90",
  },
  closed: {
    label: "Cerrado",
    className: "bg-muted text-muted-foreground hover:bg-muted/90",
  },
  alert: {
    label: "Alerta",
    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
