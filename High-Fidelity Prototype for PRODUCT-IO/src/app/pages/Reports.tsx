import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { KPICard } from "../components/KPICard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, FileText, TrendingUp, TrendingDown } from "lucide-react";

const weeklyData = [
  { week: "Sem 1", cost: 520000 },
  { week: "Sem 2", cost: 485000 },
  { week: "Sem 3", cost: 612000 },
  { week: "Sem 4", cost: 558000 },
];

const familyDistribution = [
  { name: "Servilletas", value: 285000, color: "#2E86AB" },
  { name: "Bolsitas", value: 198000, color: "#2A9D8F" },
  { name: "Troquelados", value: 145000, color: "#F4A261" },
  { name: "Pajitas", value: 312000, color: "#E63946" },
  { name: "Vasos", value: 235000, color: "#1E3A5F" },
];

const familyDetails = [
  {
    family: "Servilletas",
    batches: 24,
    units: "1,250,000",
    totalCost: "$285,000",
    avgCost: "$11,875",
    efficiency: "89.2%",
  },
  {
    family: "Bolsitas",
    batches: 18,
    units: "890,000",
    totalCost: "$198,000",
    avgCost: "$11,000",
    efficiency: "85.7%",
  },
  {
    family: "Troquelados",
    batches: 12,
    units: "560,000",
    totalCost: "$145,000",
    avgCost: "$12,083",
    efficiency: "82.4%",
  },
  {
    family: "Pajitas",
    batches: 28,
    units: "1,680,000",
    totalCost: "$312,000",
    avgCost: "$11,143",
    efficiency: "91.5%",
  },
  {
    family: "Vasos",
    batches: 20,
    units: "1,120,000",
    totalCost: "$235,000",
    avgCost: "$11,750",
    efficiency: "87.8%",
  },
];

export default function Reports() {
  const [period, setPeriod] = useState("2026-06");

  const totalCost = familyDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reportes y Análisis</h1>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-06">Junio 2026</SelectItem>
              <SelectItem value="2026-05">Mayo 2026</SelectItem>
              <SelectItem value="2026-04">Abril 2026</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          label="Variación de Stock"
          value="+12.5%"
          trend={{ value: 2.3, isPositive: true }}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <KPICard
          label="Horas Producidas Totales"
          value="1,248h"
          trend={{ value: 8.1, isPositive: true }}
        />
        <KPICard
          label="Eficiencia de Línea Promedio"
          value="87.3%"
          trend={{ value: 3.2, isPositive: true }}
        />
        <KPICard
          label="Costo Total del Período"
          value={`$${totalCost.toLocaleString()}`}
          trend={{ value: 1.8, isPositive: false }}
          icon={<TrendingDown className="w-6 h-6" />}
        />
        <KPICard
          label="Costo Promedio por Familia"
          value="$235,000"
        />
        <KPICard
          label="Costo Operativo Mensual"
          value="$1,175,000"
          trend={{ value: 4.5, isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Evolución de Costos por Semana</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="cost" stroke="#2E86AB" strokeWidth={3} dot={{ fill: "#2E86AB", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Distribución de Costos por Familia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={familyDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#6B7280", strokeWidth: 1 }}
              >
                {familyDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Detalle por Familia de Producto</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Familia</TableHead>
              <TableHead>Lotes</TableHead>
              <TableHead>Unidades</TableHead>
              <TableHead>Costo Total</TableHead>
              <TableHead>Costo Promedio</TableHead>
              <TableHead>Eficiencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {familyDetails.map((family) => (
              <TableRow key={family.family}>
                <TableCell className="font-semibold">{family.family}</TableCell>
                <TableCell>{family.batches}</TableCell>
                <TableCell>{family.units}</TableCell>
                <TableCell className="font-semibold">{family.totalCost}</TableCell>
                <TableCell>{family.avgCost}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-success h-full rounded-full"
                        style={{ width: family.efficiency }}
                      />
                    </div>
                    <span className="text-sm font-medium min-w-12">{family.efficiency}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
