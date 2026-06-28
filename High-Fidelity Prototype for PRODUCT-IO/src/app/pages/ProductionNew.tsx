import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const productionLines = [
  { value: "servilletas", label: "Línea Servilletas" },
  { value: "bolsitas", label: "Línea Bolsitas" },
  { value: "troquelados", label: "Línea Troquelados" },
  { value: "pajitas", label: "Línea Pajitas" },
  { value: "vasos", label: "Línea Vasos" },
];

const machines = {
  servilletas: ["Máquina S-01", "Máquina S-02"],
  bolsitas: ["Máquina B-01", "Máquina B-02"],
  troquelados: ["Máquina T-01"],
  pajitas: ["Máquina P-01", "Máquina P-02", "Máquina P-03"],
  vasos: ["Máquina V-01", "Máquina V-02"],
};

const products = {
  servilletas: [
    { sku: "SERV-500-BL", name: "Servilleta 500 hojas blanca" },
    { sku: "SERV-250-CO", name: "Servilleta 250 hojas color" },
  ],
  bolsitas: [
    { sku: "BOLS-100-KR", name: "Bolsitas 100 unidades kraft" },
    { sku: "BOLS-200-BL", name: "Bolsitas 200 unidades blanca" },
  ],
  troquelados: [
    { sku: "TROQ-250-FL", name: "Troquelados florales 250 unidades" },
  ],
  pajitas: [
    { sku: "PAJI-500-BI", name: "Pajitas biodegradables 500 unidades" },
    { sku: "PAJI-1000-PP", name: "Pajitas papel 1000 unidades" },
  ],
  vasos: [
    { sku: "VASOS-200-PP", name: "Vasos papel 200ml" },
    { sku: "VASOS-350-PP", name: "Vasos papel 350ml" },
  ],
};

export default function ProductionNew() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    line: "",
    machine: "",
    product: "",
    employees: "",
    startDate: new Date().toISOString().split("T")[0],
    startTime: new Date().toTimeString().slice(0, 5),
  });

  const handleNext = () => {
    if (!formData.line || !formData.machine || !formData.product) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    toast.success("Lote iniciado correctamente ✓");
    navigate("/production");
  };

  const selectedLineProducts = formData.line ? products[formData.line as keyof typeof products] : [];
  const selectedLineMachines = formData.line ? machines[formData.line as keyof typeof machines] : [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => step === 1 ? navigate("/production") : setStep(1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold">Iniciar Nuevo Lote</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          }`}>
            1
          </div>
          <span className="text-sm font-medium">Datos del proceso</span>
        </div>
        <div className="w-16 h-0.5 bg-border" />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          }`}>
            2
          </div>
          <span className="text-sm font-medium">Confirmación</span>
        </div>
      </div>

      {/* Step 1: Form */}
      {step === 1 && (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="line">Línea de Producción *</Label>
              <Select value={formData.line} onValueChange={(value) => setFormData({ ...formData, line: value, machine: "", product: "" })}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccione una línea" />
                </SelectTrigger>
                <SelectContent>
                  {productionLines.map((line) => (
                    <SelectItem key={line.value} value={line.value}>
                      {line.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="machine">Máquina Disponible *</Label>
              <Select value={formData.machine} onValueChange={(value) => setFormData({ ...formData, machine: value })} disabled={!formData.line}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccione una máquina" />
                </SelectTrigger>
                <SelectContent>
                  {selectedLineMachines.map((machine) => (
                    <SelectItem key={machine} value={machine}>
                      {machine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="product">Producto (SKU) *</Label>
              <Select value={formData.product} onValueChange={(value) => setFormData({ ...formData, product: value })} disabled={!formData.line}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccione un producto" />
                </SelectTrigger>
                <SelectContent>
                  {selectedLineProducts.map((product) => (
                    <SelectItem key={product.sku} value={product.sku}>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="employees">Empleados Asignados</Label>
              <Input
                id="employees"
                placeholder="Ej: Juan Pérez, María González"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                className="bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Fecha de Inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-white"
                />
              </div>
              <div>
                <Label htmlFor="startTime">Hora de Inicio</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="bg-white"
                />
              </div>
            </div>

            <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90" size="lg">
              Siguiente
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Confirmation */}
      {step === 2 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Confirmación de Datos</h3>
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Línea de Producción</p>
              <p className="font-semibold">
                {productionLines.find(l => l.value === formData.line)?.label}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Máquina</p>
              <p className="font-semibold">{formData.machine}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Producto</p>
              <p className="font-semibold">
                {selectedLineProducts.find(p => p.sku === formData.product)?.name}
              </p>
              <p className="text-xs text-muted-foreground font-mono">{formData.product}</p>
            </div>
            {formData.employees && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Empleados Asignados</p>
                <p className="font-semibold">{formData.employees}</p>
              </div>
            )}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Fecha y Hora de Inicio</p>
              <p className="font-semibold">{formData.startDate} {formData.startTime}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
              Volver
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-success hover:bg-success/90" size="lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirmar e Iniciar Lote
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
