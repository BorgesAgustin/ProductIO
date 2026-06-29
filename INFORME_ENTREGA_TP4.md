# Informe de Entrega — Sprint TP4 (PRODUCT-IO) 🚀

Este documento resume todas las tareas, correcciones de diseño y de base de datos que se implementaron con éxito para dar por completado el **Sprint TP4** en el entorno de desarrollo local y de producción (AwardSpace).

---

## 1. Meta del Sprint y Objetivos Cumplidos

La meta del Sprint era implementar el **Dashboard principal con datos dinámicos** y las dos pantallas de administración de **Datos Maestros** (**Clientes** y **Productos**), asegurando un diseño 100% consistente con el prototipo de alta fidelidad de Figma y una arquitectura limpia bajo las pautas de `AGENTS.md`.

*   **Pantalla de Login y Onboarding (Selección de Fábrica)**: Totalmente funcionales, integrando roles dinámicos de la base de datos (Administrador / Operario) con estilos premium de Figma.
*   **Dashboard**: Implementado con indicadores reales (cantidad de clientes y productos) y un gráfico de barras interactivo con doble eje (Unidades y Costo) usando **Chart.js**.
*   **Gestión de Clientes (CRUD)**: Creación, edición y listado reactivo de clientes por fábrica mediante llamadas asíncronas con `fetch`.
*   **Catálogo de Productos (CRUD)**: Creación, edición y listado de productos, con SKUs autogestionados, estados y chips de colores dinámicos según la familia del producto.

---

## 2. Base de Datos y Despliegue en Producción

Para garantizar el funcionamiento de la base de datos y la seguridad en el servidor en la nube de **AwardSpace** (`productio.hande.ar`), se implementaron las siguientes soluciones arquitectónicas:

1.  **Seguridad de Credenciales**: 
    *   Se modificó `config/database.php` para leer datos desde variables de entorno (`getenv`) o mediante un fallback a un archivo local externo `config/database.local.php`.
    *   El archivo `database.local.php` fue añadido a `.gitignore` para evitar subir contraseñas en texto plano al repositorio público de GitHub.
2.  **Migración del Esquema SQL**:
    *   Se ejecutó la migración del archivo `sql/schema_20260619_183100.sql` en el servidor de base de datos de AwardSpace (`pdb1049.awardspace.net`), creando con éxito las tablas **`clientes`** y **`productos`** con sus respectivos datos de prueba y claves foráneas.
    *   Esto resolvió el error de tablas inexistentes (`Table 1146 ... doesn't exist`) al listar la información en la web.

---

## 3. Correcciones de la Revisión de Código (Code Review)

Se resolvieron de forma incremental 8 observaciones clave sobre la calidad del código y la seguridad:

| # | Problema | Solución Implementada | Archivos Modificados |
|---|---|---|---|
| **1** | Casing en Familia de Producto | Se forzó la familia a mayúsculas con `strtoupper()` antes de validar/guardar para evitar que chips del frontend perdieran el estilo. Se eliminó la función obsoleta `in_repeat_check`. | `/api/productos/guardar.php` |
| **2** | Falta de Verificación de Sesión | Se añadió validación de sesión activa al endpoint de selección de fábrica para evitar accesos no autorizados. | `/api/fabricas/seleccionar.php` |
| **3** | Rol Inconsistente en Sidebar | Se lee el rol real del usuario por fábrica desde la base de datos (`$_SESSION['rol_fabrica']`) en lugar de inferirlo a partir del nombre de usuario. | `/api/fabricas/seleccionar.php`, `/partials/sidebar.php` |
| **4** | AGENTS.md Desactualizado | Se corrigieron las referencias de extensión de archivos de `.html` a `.php` en la estructura sugerida de carpetas. | `/AGENTS.md` |
| **5** | Limpieza de Estilos Inline | Se crearon las clases `.table-wrapper--flat` y `.col--actions` en el CSS global, removiendo los atributos `style="..."` de las tablas. | `/assets/css/styles.css`, `/pages/clientes.php`, `/pages/productos.php` |
| **6** | Validación de Email | Se añadió validación de formato de correo electrónico mediante `filter_var` con el filtro `FILTER_VALIDATE_EMAIL`. | `/api/clientes/guardar.php` |
| **7** | KPIs Simulados del Dashboard | Se añadieron comentarios aclaratorios en el backend. Se enviaron las banderas `kpis_produccion_simulados` y `kpis_maestros_simulados` en la respuesta JSON del resumen. | `/api/dashboard/obtener_resumen.php`, `/specs/SPEC-09-SCRUM-TP4.md` |
| **8** | Credenciales Expuestas | Se implementó el mecanismo de exclusión y fallback de `database.local.php` y se generó la plantilla `database.local.example.php`. | `/config/database.php`, `/.gitignore`, `/config/database.local.example.php` [NEW] |

---

## 4. Control de Versiones (Ramas de Git)

El desarrollo del Sprint se organizó bajo un esquema seguro de ramas para evitar afectar la rama principal de manera imprevista:

*   **`antigravity`**: Contiene la resolución de las fases de maquetado Figma, el conector de base de datos dinámico y las 8 correcciones iniciales del Code Review.
*   **`fix`**: Creada a partir de `antigravity` para resolver la ejecución de la migración en el servidor y asegurar que el sistema no presente fallos de tablas o de conexión en producción.

---

## 5. Conclusión de la Entrega

El proyecto **PRODUCT-IO** cuenta ahora con una arquitectura base robusta, segura y escalable. Las pantallas administrativas de Clientes y Productos están listas para interactuar con los futuros módulos de **Producción** y **Costeo**, cumpliendo cabalmente con las directrices de la cátedra y las necesidades de la papelera.
