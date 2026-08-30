import { Card } from "../components/ui/card";
import { Package } from "lucide-react";

export default function Supplies() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="p-12 max-w-md">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Módulo de Insumos</h2>
          <p className="text-muted-foreground">
            Esta sección permitirá gestionar el inventario de materias primas,
            registro de entradas, control de stock y seguimiento de proveedores.
          </p>
        </div>
      </Card>
    </div>
  );
}
