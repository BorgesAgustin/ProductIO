import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Clock, Factory } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";

interface ActiveBatch {
  id: string;
  product: string;
  sku: string;
  line: string;
  machine: string;
  startTime: string;
}

const activeBatches: ActiveBatch[] = [
  {
    id: "LT-2401",
    product: "Servilleta 500 hojas",
    sku: "SERV-500-BL",
    line: "Línea Servilletas",
    machine: "Máquina S-01",
    startTime: "08:30",
  },
  {
    id: "LT-2404",
    product: "Pajitas biodegradables",
    sku: "PAJI-500-BI",
    line: "Línea Pajitas",
    machine: "Máquina P-03",
    startTime: "09:15",
  },
];

export default function Production() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Lotes Activos</h1>
        <Button
          onClick={() => navigate("/production/new")}
          className="bg-primary hover:bg-primary/90"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Iniciar Nuevo Lote
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeBatches.map((batch) => (
          <Card key={batch.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">{batch.id}</h3>
                    <StatusBadge status="active" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{batch.product}</p>
                  <p className="text-xs text-muted-foreground font-mono">{batch.sku}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Factory className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Línea:</span>
                  <span className="font-medium">{batch.line}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Factory className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Máquina:</span>
                  <span className="font-medium">{batch.machine}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Inicio:</span>
                  <span className="font-medium">{batch.startTime}</span>
                </div>
              </div>

              <Button
                onClick={() => navigate(`/production/close/${batch.id}`)}
                variant="outline"
                className="w-full border-success text-success hover:bg-success hover:text-white"
              >
                Cerrar Lote
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {activeBatches.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-3">
            <Factory className="w-16 h-16 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No hay lotes activos</h3>
            <p className="text-sm text-muted-foreground">
              Comienza un nuevo lote de producción para registrar el proceso
            </p>
            <Button
              onClick={() => navigate("/production/new")}
              className="bg-primary hover:bg-primary/90 mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Iniciar Nuevo Lote
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
