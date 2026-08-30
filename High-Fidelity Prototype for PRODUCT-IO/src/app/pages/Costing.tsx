import { Card } from "../components/ui/card";
import { DollarSign } from "lucide-react";

export default function Costing() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="p-12 max-w-md">
        <div className="text-center space-y-4">
          <DollarSign className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Módulo de Costeo</h2>
          <p className="text-muted-foreground">
            Esta sección permitirá configurar estructuras de costos,
            asignar costos indirectos, calcular márgenes y analizar rentabilidad por producto.
          </p>
        </div>
      </Card>
    </div>
  );
}
