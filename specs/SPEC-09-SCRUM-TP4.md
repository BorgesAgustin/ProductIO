# /specs/SPEC-09-SCRUM-TP4.md

**Autor: Briant Gauna**

## 1. Introducción y Objetivo
Este documento detalla el marco de trabajo Scrum aplicado al **Sprint TP4** del proyecto **PRODUCT-IO** (Papelera K&A). Define los roles, el Product Backlog refinado, el Sprint Backlog seleccionado para este ciclo, los criterios de aceptación, las definiciones de Listo (DoR) y Hecho (DoD), el tablero Kanban/Taskboard y la planificación de evidencias de trabajo.

---

## 2. Roles Scrum del Equipo
Para este Sprint, se mantiene la estructura organizativa acordada por el Grupo 6 en los entregables previos:

* **Product Owner (PO)**: **Borges, Marcelo Agustín**
  * *Responsabilidades*: Maximizar el valor del producto, refinar e indicar prioridades en el Product Backlog y validar que el incremento cumpla con las necesidades de Papelera K&A.
* **Scrum Master (SM)**: **Belaber, Joaquín Felipe**
  * *Responsabilidades*: Facilitar ceremonias (planning, review, retro), remover impedimentos técnicos u organizativos y asegurar la adhesión al marco ágil y las directrices de [AGENTS.md](file:///c:/Users/marco/OneDrive/Escritorio/Carpetas_Facultad/productio/AGENTS.md).
* **Equipo de Desarrollo (Developers)**: 
  * **Elisaul, Néstor Julián** (Desarrollador Fullstack / UX)
  * **Bandera, Marcos Valentín Jesús** (Arquitecto de Software / Base de Datos)
  * *Responsabilidades*: Crear el incremento de software funcional (código frontend, backend, base de datos y scripts de migración).

---

## 3. Product Backlog Refinado (PBR)
Se actualiza el Product Backlog incorporando las historias para datos maestros (Clientes y Productos) y el Dashboard dinámico necesarios para habilitar el flujo básico:

| ID | Módulo | Historia de Usuario (Resumen) | Criterio de Aceptación | Story Points | Prioridad |
|---|---|---|---|---|---|
| **PB01** | Producción | Registrar inicio y fin de lote productivo. | El sistema calcula la duración y almacena en <2 seg. | 8 | Alta |
| **PB02** | Insumos | Cargar insumos y desperdicios por lote. | El sistema valida cantidades y vincula el insumo al lote. | 5 | Alta |
| **PB03** | Costeo | Cálculo automático de costo por lote. | El costo coincide con el cálculo manual en un $\ge$ 99%. | 13 | Alta |
| **PB04** | Trazabilidad | Rastrear el recorrido completo de un lote. | Muestra insumos, controles, costos y tiempos. | 8 | Alta |
| **PB05** | Calidad | Registrar controles de calidad por lote. | Registro vinculado al lote e integrado en PDF. | 5 | Media |
| **PB06** | Reportes | Generación y exportación de reportes mensuales. | Permite descarga en Excel/PDF en <5 seg. | 8 | Alta |
| **PB07** | Usuarios | Gestión de usuarios y roles (RBAC). | Control de acceso seguro por perfil. | 5 | Media |
| **PB08** | Catálogo | **[NUEVO]** Registrar y gestionar catálogo de productos. | Alta, modificación y listado de productos con SKU por fábrica. | 5 | Alta |
| **PB09** | Clientes | **[NUEVO]** Registrar y gestionar catálogo de clientes. | Alta, modificación y listado de clientes por fábrica. | 5 | Alta |
| **PB10** | Dashboard | **[NUEVO]** Panel de control dinámico. | Visualización en tiempo real de estadísticas de la fábrica actual. | 5 | Alta |

---

## 4. Planificación del Sprint TP4 (Sprint Planning)

### 4.1. Meta del Sprint
> **"Implementar la interfaz principal (Dashboard) con datos dinámicos y las dos interfaces de administración (Clientes y Productos) para consolidar los datos maestros necesarios en el flujo de ProductIO."**

### 4.2. Sprint Backlog Seleccionado
Para cumplir la meta, el equipo selecciona los siguientes ítems de mayor prioridad:

1. **PB10 - Dashboard de Control Principal** (5 SP)
2. **PB09 - Gestión de Clientes** (5 SP)
3. **PB08 - Gestión de Catálogo de Productos** (5 SP)

### 4.3. Capacidad del Equipo y Esfuerzo
* **Esfuerzo Total**: 15 Story Points.
* **Capacidad Estimada**: 28 horas reales de desarrollo (7 horas por cada uno de los 4 integrantes del equipo durante el sprint de 2 semanas, considerando la carga académica paralela).

---

## 5. Definición de Aceptación

### 5.1. Definition of Ready (DoR - ¿Cuándo iniciar?)
Una tarea o historia de usuario está "Lista" para ser programada si:
* Cuenta con una descripción clara de la funcionalidad y criterios de aceptación específicos.
* Las dependencias de base de datos están identificadas.
* Se conoce el flujo visual en base a los mockups definidos en el TP3.

### 5.2. Definition of Done (DoD - ¿Cuándo terminar?)
Una tarea o historia de usuario se considera "Hecha" si:
* El código cumple con las reglas estrictas de [AGENTS.md](file:///c:/Users/marco/OneDrive/Escritorio/Carpetas_Facultad/productio/AGENTS.md) (sin frameworks, archivos HTML y JS por separado, comunicación por fetch a la API PHP).
* Pasa validaciones básicas de entrada en backend y frontend (sin valores vacíos o formatos inválidos).
* Las consultas SQL se realizan mediante sentencias preparadas de PDO.
* Ha sido revisada en código o probada localmente por un miembro del equipo distinto al autor.
* Toda alteración a la base de datos está registrada en un script de migración en `/sql/` con timestamp.

---

## 6. Scrum Taskboard (Tablero de Tareas) - Sprint TP4

El flujo de trabajo se representa en 5 columnas: `Backlog`, `To Do` (Por Hacer), `In Progress` (En Curso), `Review/QA` (En Revisión) y `Done` (Completado).

```
+------------------+------------------+------------------+------------------+------------------+
|     BACKLOG      |      TO DO       |   IN PROGRESS    |    REVIEW/QA     |       DONE       |
+------------------+------------------+------------------+------------------+------------------+
| PB01 (8 SP)      |                  |                  |                  |                  |
| PB02 (5 SP)      |                  |                  |                  |                  |
| PB03 (13 SP)     |                  |                  |                  |                  |
| PB04 (8 SP)      |                  |                  |                  |                  |
| PB05 (5 SP)      |                  |                  |                  |                  |
| PB06 (8 SP)      |                  |                  |                  |                  |
| PB07 (5 SP)      |                  |                  |                  |                  |
|                  |                  |                  |                  |                  |
|                  | [ ] Tarea SQL:   | [ ] TP4-01:      | [ ] TP4-03:      |                  |
|                  |     Migración    |     Dashboard    |     Productos    |                  |
|                  |     Tablas (DB)  |     (HTML/JS/API)|     (HTML/JS/API)|                  |
|                  |                  |                  |                  |                  |
|                  |                  | [ ] TP4-02:      |                  |                  |
|                  |                  |     Clientes     |                  |                  |
|                  |                  |     (HTML/JS/API)|                  |                  |
+------------------+------------------+------------------+------------------+------------------+
```

---

## 7. Evidencia de Trabajo y Reporte de Pruebas
Al finalizar el Sprint, se presentará en el informe final:
1. **Capturas de Pantalla**: Las nuevas interfaces (Dashboard, Clientes, Productos) renderizadas con estilos consistentes.
2. **Logs e Inspección de Red (DevTools)**: Capturas de las llamadas HTTP GET/POST mediante `fetch` confirmando las respuestas JSON desde el backend.
3. **Persistencia en DB**: Capturas de las tablas `clientes` y `productos` en el gestor MySQL remota mostrando los registros de prueba ingresados por la interfaz.
