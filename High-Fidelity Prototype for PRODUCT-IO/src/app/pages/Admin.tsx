import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RoleBadge, UserRole } from "../components/RoleBadge";
import { Badge } from "../components/ui/badge";
import { Plus, Edit, XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  lastAccess: string;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@papelera-ka.com",
    role: "manager",
    status: "active",
    lastAccess: "2026-06-05 14:30",
  },
  {
    id: "2",
    name: "María González",
    email: "maria.gonzalez@papelera-ka.com",
    role: "operator",
    status: "active",
    lastAccess: "2026-06-05 13:15",
  },
  {
    id: "3",
    name: "Carlos Méndez",
    email: "carlos.mendez@papelera-ka.com",
    role: "quality",
    status: "active",
    lastAccess: "2026-06-05 11:45",
  },
  {
    id: "4",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@papelera-ka.com",
    role: "accountant",
    status: "active",
    lastAccess: "2026-06-04 16:20",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@papelera-ka.com",
    role: "maintenance",
    status: "inactive",
    lastAccess: "2026-05-28 09:00",
  },
];

export default function Admin() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "" as UserRole,
  });

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastAccess: "-",
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", password: "", role: "" as UserRole });
    setDialogOpen(false);
    toast.success("Usuario creado correctamente ✓");
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      ) as User[]
    );
    toast.success("Estado actualizado");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Roberto Martínez"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@papelera-ka.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña Temporal *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol *</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operator">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded" />
                        Operario de Línea
                      </div>
                    </SelectItem>
                    <SelectItem value="quality">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded" />
                        Encargado de Calidad
                      </div>
                    </SelectItem>
                    <SelectItem value="maintenance">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded" />
                        Encargado de Mantenimiento
                      </div>
                    </SelectItem>
                    <SelectItem value="accountant">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded" />
                        Contador / Analista
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded" />
                        Gerente de Producción
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-destructive rounded" />
                        Administrador
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateUser} className="w-full bg-primary hover:bg-primary/90">
                Crear Usuario
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <RoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  {user.status === "active" ? (
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Activo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      <XCircle className="w-3 h-3 mr-1" />
                      Inactivo
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm">{user.lastAccess}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(user.id)}
                      className={user.status === "active" ? "text-destructive hover:text-destructive" : ""}
                    >
                      {user.status === "active" ? (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Activar
                        </>
                      )}
                    </Button>
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
