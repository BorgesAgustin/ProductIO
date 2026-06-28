import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { StatusBadge, BatchStatus } from "../components/StatusBadge";
import { ProductFamilyChip, ProductFamily } from "../components/ProductFamilyChip";
import { Search, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface Batch {
  id: string;
  sku: string;
  product: string;
  line: string;
  family: ProductFamily;
  startDate: string;
  endDate: string;
  status: BatchStatus;
  cost: string;
}

const batches: Batch[] = [
  {
    id: "LT-2401",
    sku: "SERV-500-BL",
    product: "Servilleta 500 hojas",
    line: "L1",
    family: "servilletas",
    startDate: "2026-06-05 08:30",
    endDate: "2026-06-05 14:20",
    status: "active",
    cost: "$145,200",
  },
  {
    id: "LT-2402",
    sku: "BOLS-100-KR",
    product: "Bolsitas 100 unidades",
    line: "L2",
    family: "bolsitas",
    startDate: "2026-06-05 09:15",
    endDate: "-",
    status: "in_progress",
    cost: "$89,500",
  },
  {
    id: "LT-2403",
    sku: "TROQ-250-FL",
    product: "Troquelados florales",
    line: "L3",
    family: "troquelados",
    startDate: "2026-06-04 10:00",
    endDate: "2026-06-04 16:45",
    status: "closed",
    cost: "$67,800",
  },
  {
    id: "LT-2404",
    sku: "PAJI-500-BI",
    product: "Pajitas biodegradables",
    line: "L4",
    family: "pajitas",
    startDate: "2026-06-05 07:45",
    endDate: "-",
    status: "active",
    cost: "$123,400",
  },
  {
    id: "LT-2405",
    sku: "VASOS-200-PP",
    product: "Vasos papel 200ml",
    line: "L5",
    family: "vasos",
    startDate: "2026-06-03 08:00",
    endDate: "2026-06-03 15:30",
    status: "closed",
    cost: "$98,700",
  },
];

export default function Traceability() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [lineFilter, setLineFilter] = useState<string>("all");

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
    const matchesLine = lineFilter === "all" || batch.line === lineFilter;
    return matchesSearch && matchesStatus && matchesLine;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trazabilidad de Lotes</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID de lote, SKU o fecha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="in_progress">En Proceso</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={lineFilter} onValueChange={setLineFilter}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Línea" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las líneas</SelectItem>
                <SelectItem value="L1">Línea 1</SelectItem>
                <SelectItem value="L2">Línea 2</SelectItem>
                <SelectItem value="L3">Línea 3</SelectItem>
                <SelectItem value="L4">Línea 4</SelectItem>
                <SelectItem value="L5">Línea 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Results Table */}
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Lote</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Familia</TableHead>
              <TableHead>Línea</TableHead>
              <TableHead>Fecha Inicio</TableHead>
              <TableHead>Fecha Fin</TableHead>
              <TableHead>Costo Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-mono font-semibold">{batch.id}</TableCell>
                <TableCell className="font-mono text-sm">{batch.sku}</TableCell>
                <TableCell>{batch.product}</TableCell>
                <TableCell>
                  <ProductFamilyChip family={batch.family} />
                </TableCell>
                <TableCell>{batch.line}</TableCell>
                <TableCell className="text-sm">{batch.startDate}</TableCell>
                <TableCell className="text-sm">{batch.endDate}</TableCell>
                <TableCell className="font-semibold">{batch.cost}</TableCell>
                <TableCell>
                  <StatusBadge status={batch.status} />
                </TableCell>
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

        {filteredBatches.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No se encontraron lotes con los filtros aplicados</p>
          </div>
        )}
      </Card>
    </div>
  );
}
