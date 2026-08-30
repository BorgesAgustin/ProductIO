import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, Plus, Trash2, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";

interface Supply {
  id: string;
  sku: string;
  quantity: string;
  batchNumber: string;
  supplier: string;
}

export default function ProductionClose() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSuppliesOpen, setIsSuppliesOpen] = useState(false);
  const [formData, setFormData] = useState({
    endDate: new Date().toISOString().split("T")[0],
    endTime: new Date().toTimeString().slice(0, 5),
    quantityProduced: "",
    quantityWaste: "",
  });
  const [supplies, setSupplies] = useState<Supply[]>([]);

  const handleAddSupply = () => {
    setSupplies([
      ...supplies,
      { id: Date.now().toString(), sku: "", quantity: "", batchNumber: "", supplier: "" },
    ]);
    setIsSuppliesOpen(true);
  };

  const handleRemoveSupply = (id: string) => {
    setSupplies(supplies.filter((s) => s.id !== id));
  };

  const handleSupplyChange = (id: string, field: keyof Supply, value: string) => {
    setSupplies(supplies.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = () => {
    if (!formData.quantityProduced) {
      toast.error("Por favor ingrese la cantidad producida");
      return;
    }
    toast.success("Lote cerrado correctamente ✓");
    navigate("/production");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/production")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Cerrar Lote</h1>
          <p className="text-sm text-muted-foreground">
            Lote: <span className="font-mono font-semibold">{id}</span>
          </p>
        </div>
      </div>

      <Card className="p-6">
        {/* Batch Info */}
        <div className="p-4 bg-muted rounded-lg mb-6">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Producto</p>
              <p className="font-semibold">Servilleta 500 hojas</p>
              <p className="text-xs text-muted-foreground font-mono">SERV-500-BL</p>
            </div>
            <div>
              <p className="text-muted-foreground">Línea</p>
              <p className="font-semibold">Línea Servilletas</p>
            </div>
            <div>
              <p className="text-muted-foreground">Hora de Inicio</p>
              <p className="font-semibold">08:30</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* End Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate">Fecha de Fin</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="endTime">Hora de Fin *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="bg-white"
              />
            </div>
          </div>

          {/* Quantities */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantityProduced">Cantidad Producida Real *</Label>
              <Input
                id="quantityProduced"
                type="number"
                placeholder="Ej: 50000"
                value={formData.quantityProduced}
                onChange={(e) => setFormData({ ...formData, quantityProduced: e.target.value })}
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="quantityWaste">Cantidad Desperdiciada (Merma)</Label>
              <Input
                id="quantityWaste"
                type="number"
                placeholder="Ej: 1250"
                value={formData.quantityWaste}
                onChange={(e) => setFormData({ ...formData, quantityWaste: e.target.value })}
                className="bg-white"
              />
            </div>
          </div>

          {/* Supplies Section */}
          <Collapsible open={isSuppliesOpen} onOpenChange={setIsSuppliesOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between" type="button">
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Agregar Insumos Consumidos ({supplies.length})
                </span>
                {isSuppliesOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-3">
              {supplies.map((supply) => (
                <div key={supply.id} className="p-4 border border-border rounded-lg bg-white">
                  <div className="grid grid-cols-5 gap-3">
                    <div>
                      <Label className="text-xs">SKU Insumo</Label>
                      <Input
                        placeholder="Ej: PAP-A4-80"
                        value={supply.sku}
                        onChange={(e) => handleSupplyChange(supply.id, "sku", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Cantidad</Label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={supply.quantity}
                        onChange={(e) => handleSupplyChange(supply.id, "quantity", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">N° Lote Insumo</Label>
                      <Input
                        placeholder="LI-1234"
                        value={supply.batchNumber}
                        onChange={(e) => handleSupplyChange(supply.id, "batchNumber", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Proveedor</Label>
                      <Input
                        placeholder="Proveedor XYZ"
                        value={supply.supplier}
                        onChange={(e) => handleSupplyChange(supply.id, "supplier", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSupply(supply.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddSupply}
                className="w-full border-dashed"
                type="button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Fila
              </Button>
            </CollapsibleContent>
          </Collapsible>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={() => navigate("/production")} variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-success hover:bg-success/90"
              size="lg"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Cerrar Lote
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
