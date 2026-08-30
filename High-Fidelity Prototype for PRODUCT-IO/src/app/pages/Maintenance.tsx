import { Card } from "../components/ui/card";
import { Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="p-12 max-w-md">
        <div className="text-center space-y-4">
          <Wrench className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Módulo de Mantenimiento</h2>
          <p className="text-muted-foreground">
            Esta sección permitirá programar mantenimientos preventivos,
            registrar reparaciones, gestionar paradas de máquina y controlar repuestos.
          </p>
        </div>
      </Card>
    </div>
  );
}
