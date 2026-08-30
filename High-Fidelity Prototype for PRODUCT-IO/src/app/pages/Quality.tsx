import { Card } from "../components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Quality() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="p-12 max-w-md">
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Módulo de Calidad</h2>
          <p className="text-muted-foreground">
            Esta sección permitirá registrar inspecciones de calidad,
            gestionar no conformidades, definir parámetros de control y generar certificados.
          </p>
        </div>
      </Card>
    </div>
  );
}
