import { KPICard } from "../components/KPICard";
import { StatusBadge } from "../components/StatusBadge";
import { ProductFamilyChip } from "../components/ProductFamilyChip";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Factory, DollarSign, TrendingUp, AlertCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router";

const performanceData = [
  { line: "Servilletas L1", units: 8500 },
  { line: "Bolsitas L2", units: 6200 },
  { line: "Troquelados L3", units: 4800 },
  { line: "Pajitas L4", units: 9100 },
  { line: "Vasos L5", units: 5400 },
];

const recentBatches = [
  { id: "LT-2401", sku: "SERV-500-BL", product: "Servilleta 500 hojas", line: "L1", status: "active" as const, cost: "$145,200", family: "servilletas" as const },
  { id: "LT-2402", sku: "BOLS-100-KR", product: "Bolsitas 100 unidades", line: "L2", status: "in_progress" as const, cost: "$89,500", family: "bolsitas" as const },
  { id: "LT-2403", sku: "TROQ-250-FL", product: "Troquelados florales", line: "L3", status: "closed" as const, cost: "$67,800", family: "troquelados" as const },
  { id: "LT-2404", sku: "PAJI-500-BI", product: "Pajitas biodegradables", line: "L4", status: "active" as const, cost: "$123,400", family: "pajitas" as const },
  { id: "LT-2405", sku: "VASOS-200-PP", product: "Vasos papel 200ml", line: "L5", status: "closed" as const, cost: "$98,700", family: "vasos" as const },
];

const alerts = [
  { type: "warning", message: "Merma alta en LT-2401 (8.5%)", time: "Hace 15 min" },
  { type: "error", message: "Retraso en línea L3", time: "Hace 1 hora" },
  { type: "info", message: "Mantenimiento programado L2", time: "Hace 2 horas" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Lotes Activos Hoy"
          value={12}
          trend={{ value: 15, isPositive: true }}
          icon={<Factory className="w-6 h-6" />}
        />
        <KPICard
          label="Costo Promedio por Lote"
          value="$104,920"
          trend={{ value: 3.2, isPositive: false }}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <KPICard
          label="Eficiencia de Línea"
          value="87.5%"
          trend={{ value: 5.1, isPositive: true }}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <KPICard
          label="Alertas Pendientes"
          value={3}
          icon={<AlertCircle className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-4">Rendimiento por Línea de Producción</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="line" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: 'Unidades/min', angle: -90, position: 'insideLeft', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="units" fill="#2E86AB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Alertas Recientes</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className={`w-4 h-4 mt-0.5 ${
                    alert.type === 'error' ? 'text-destructive' :
                    alert.type === 'warning' ? 'text-accent' :
                    'text-secondary'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Batches Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Últimos 5 Lotes Registrados</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Lote</TableHead>
              <TableHead>Producto (SKU)</TableHead>
              <TableHead>Familia</TableHead>
              <TableHead>Línea</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Costo Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBatches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-mono text-sm">{batch.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{batch.product}</p>
                    <p className="text-xs text-muted-foreground font-mono">{batch.sku}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <ProductFamilyChip family={batch.family} />
                </TableCell>
                <TableCell>{batch.line}</TableCell>
                <TableCell>
                  <StatusBadge status={batch.status} />
                </TableCell>
                <TableCell className="font-semibold">{batch.cost}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/traceability/${batch.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
