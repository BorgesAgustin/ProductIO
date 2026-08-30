import { useParams, useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Download, Package, Factory, CheckCircle, Truck, Users } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { ProductFamilyChip } from "../components/ProductFamilyChip";

interface TimelineEvent {
  icon: React.ElementType;
  title: string;
  items: { label: string; value: string }[];
}

const timelineEvents: TimelineEvent[] = [
  {
    icon: Package,
    title: "Insumos Recibidos",
    items: [
      { label: "Papel A4 80g", value: "5000 hojas | LI-8834 | Proveedor PapelCorp" },
      { label: "Tinta UV", value: "2.5L | LI-8835 | Proveedor TintaPlus" },
    ],
  },
  {
    icon: Factory,
    title: "Proceso Productivo",
    items: [
      { label: "Máquina", value: "Máquina S-01" },
      { label: "Operarios", value: "Juan Pérez, María González" },
      { label: "Duración", value: "5h 50min (08:30 - 14:20)" },
      { label: "Velocidad promedio", value: "8.5k unidades/hora" },
    ],
  },
  {
    icon: CheckCircle,
    title: "Control de Calidad",
    items: [
      { label: "Resultado", value: "APROBADO" },
      { label: "Fecha", value: "2026-06-05 14:35" },
      { label: "Encargado", value: "Carlos Méndez" },
      { label: "Observaciones", value: "Sin defectos, calidad óptima" },
    ],
  },
  {
    icon: Users,
    title: "Salida de Producción",
    items: [
      { label: "Cantidad real", value: "48,750 unidades" },
      { label: "Merma", value: "1,250 unidades (2.5%)" },
      { label: "Costo final", value: "$145,200 ARS" },
    ],
  },
  {
    icon: Truck,
    title: "Despacho",
    items: [
      { label: "Fecha", value: "2026-06-05 16:00" },
      { label: "Destino", value: "Depósito Central - Zona Norte" },
      { label: "Transporte", value: "Camión #45 - Logística K&A" },
    ],
  },
];

const costBreakdown = [
  { label: "Insumos directos", value: "$78,400" },
  { label: "Horas máquina", value: "$42,300" },
  { label: "Mano de obra", value: "$18,200" },
  { label: "Servicios indirectos (energía, etc.)", value: "$6,300" },
];

export default function TraceabilityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/traceability")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Lote</h1>
            <p className="text-sm text-muted-foreground">
              Lote: <span className="font-mono font-semibold">{id}</span>
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF de Trazabilidad
        </Button>
      </div>

      {/* Header Info */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Servilleta 500 hojas blanca</h2>
              <StatusBadge status="active" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">SKU:</span>
              <span className="font-mono font-semibold">SERV-500-BL</span>
              <ProductFamilyChip family="servilletas" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">Línea:</span>
              <span className="font-semibold">Línea Servilletas (L1)</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-3">{event.title}</h3>
                    <div className="space-y-2">
                      {event.items.map((item, i) => (
                        <div key={i} className="flex gap-2 text-sm">
                          <span className="text-muted-foreground min-w-32">{item.label}:</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="ml-5 mt-4 mb-0 h-8 w-0.5 bg-border" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Cost Summary */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Resumen de Costos</h3>
            <div className="space-y-3">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-start text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Costo Total</span>
                  <span className="text-xl font-bold text-primary">$145,200</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h4 className="font-semibold mb-2">Costo por Unidad</h4>
            <p className="text-2xl font-bold">$2.98</p>
            <p className="text-xs text-muted-foreground mt-1">
              Basado en 48,750 unidades producidas
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
