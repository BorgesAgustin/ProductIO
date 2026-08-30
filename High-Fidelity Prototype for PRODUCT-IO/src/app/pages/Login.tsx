import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem("user", JSON.stringify({
      name: username || "Juan Pérez",
      role: "manager"
    }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-primary rounded-lg flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">P</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">PRODUCT-IO</h1>
          <p className="text-sm text-muted-foreground">Papelera K&A</p>
          <p className="text-xs text-muted-foreground">Sistema de Costeo y Trazabilidad</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-border"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Ingresar
          </Button>
        </form>
      </Card>
    </div>
  );
}
