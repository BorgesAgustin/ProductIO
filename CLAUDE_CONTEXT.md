# Contexto del Proyecto: PRODUCT-IO (Para Claude Pro)

Este documento contiene todo el contexto, reglas arquitectónicas, estado actual e instrucciones del proyecto **PRODUCT-IO** para que el modelo de Claude Pro pueda continuar el desarrollo de forma alineada y sin perder el progreso.

---

## 1. Visión General del Proyecto
**PRODUCT-IO** es un sistema web de gestión de costos industriales y trazabilidad diseñado para el caso de estudio de la empresa **Papelera K&A** (fabricación de insumos de papel y plástico como servilletas, bolsas, sorbetes, vasos, etc.). Es un proyecto académico para la materia **Ingeniería de Software I** de la carrera **Ingeniería en Computación (UNaM)**.

---

## 2. Reglas del Proyecto (Establecidas en AGENTS.md)
Claude **DEBE** seguir estas reglas arquitectónicas de forma estricta:

*   **Stack Tecnológico Obligatorio**: HTML, CSS Vanilla, JavaScript Vanilla, PHP Vanilla y MySQL (usando PDO). **No se permite el uso de ningún framework frontend ni backend** (React, Vue, Laravel, TailwindCSS, etc., están prohibidos).
*   **Estructura por Pantallas**: Cada pantalla independiente debe estar representada por su propio archivo `.php` en `/pages/` y su propio archivo `.js` en `/assets/js/`.
    *   *Ejemplo*: `/pages/clientes.php` y `/assets/js/clientes.js`.
*   **Inserciones Compartidas (Partials)**: El header, footer y sidebar comunes se resuelven mediante inserciones de PHP en cada vista:
    ```php
    <?php include '../partials/header.php'; ?>
    <?php include '../partials/sidebar.php'; ?>
    <!-- Contenido de la página -->
    <?php include '../partials/footer.php'; ?>
    ```
*   **Microservicios PHP (API)**: Toda la persistencia y conexión con la base de datos se realiza mediante endpoints PHP que responden en formato JSON (CORS/Fetch). **No escribir consultas SQL directas en los archivos de vista ni en JavaScript.**
    *   *Ejemplo*: `/api/clientes/listar.php`, `/api/clientes/guardar.php`.
*   **Estilos Centralizados**: Toda la hoja de estilos general se encuentra en `/assets/css/styles.css`. Evitar estilos inline.
*   **Control de Cambios SQL**: Todo cambio en la base de datos debe quedar registrado en un archivo incremental con el formato `sql/schema_{fecha}_{hora}.sql` (Ej: `sql/schema_20260619_183100.sql`). No editar el `schema.sql` base directamente.
*   **Autoría obligatoria**: Cualquier archivo de especificación en `/specs` debe incluir la línea **`Autor: Briant Gauna`** al inicio.

---

## 3. Estado Actual del Proyecto (Sprint TP4)
El objetivo del Sprint TP4 es implementar el **Dashboard Principal Dinámico** y dos módulos de datos maestros: **Clientes** y **Catálogo de Productos (SKU)**.

### Infraestructura y Despliegue
*   **Hosting**: El proyecto está desplegado en **AwardSpace** bajo el dominio `http://productio.hande.ar`.
*   **Base de Datos**: MySQL remota en `pdb1049.awardspace.net` (Base de datos: `3434352_productio`).
*   **Migración de Extensiones**: Originalmente las vistas eran `.html`, pero debido a limitaciones de AwardSpace para procesar PHP dentro de archivos HTML, **todas las vistas de la carpeta `/pages/` fueron migradas a la extensión `.php`** y se actualizaron todas las referencias y redirecciones del proyecto.

### Progreso en el Desarrollo (Fase 1 Completada)
*   **Identidad Visual**: Se integró el sistema de estilos y variables CSS extraídos del prototipo de alta fidelidad de Figma en `/assets/css/styles.css`.
*   **Layout Base**: Se actualizaron `/partials/header.php`, `/partials/sidebar.php` y `/partials/footer.php` para implementar la estructura del menú lateral (sidebar) y cabecera del prototipo.
*   **Login**: Se migró la pantalla de inicio de sesión (`pages/login.php`) y su controlador (`assets/js/login.js`) adaptándolos al diseño del prototipo de Figma.

---

## 4. Recursos Disponibles en el Repositorio
*   **Prototipo de Figma Exportado**: En la carpeta `/High-Fidelity Prototype for PRODUCT-IO/export/` se encuentran los archivos HTML, CSS y JS maquetados directamente desde Figma. **Claude debe usar esta carpeta como la fuente de verdad absoluta para el diseño y comportamiento de las siguientes fases.**
*   **Documentación de Ingeniería**: En `/context/` se encuentran los informes en PDF de los entregables previos (TP1, TP2 y TP3) con diagramas de clases, entidad-relación (E/R), transición de estados (DTE) y modelo C4.
*   **Planificación Scrum**: En el archivo `/specs/SPEC-09-SCRUM-TP4.md` se encuentra detallada la planificación del Sprint actual.

---

## 5. Hoja de Ruta para Claude Pro (Siguientes Pasos del Sprint)

Claude Pro debe continuar con las siguientes fases de desarrollo de manera incremental:

### 🚀 Fase 2: Adaptación de la pantalla de Onboarding
*   **Objetivo**: Maquetar la selección de fábricas en [onboarding.php](file:///c:/Users/marco/OneDrive/Escritorio/Carpetas_Facultad/productio/pages/onboarding.php) según el prototipo de Figma.
*   **Acción**: Usar la estructura del grid de tarjetas del prototipo y animar el hover.

### 🚀 Fase 3: Dashboard Dinámico
*   **Objetivo**: Implementar el panel en [dashboard.php](file:///c:/Users/marco/OneDrive/Escritorio/Carpetas_Facultad/productio/pages/dashboard.php) mostrando las 4 tarjetas KPI y el gráfico de barras animado responsivo.
*   **Acción**: El gráfico debe generarse dinámicamente mediante JS consumiendo los datos del microservicio `/api/dashboard/obtener_resumen.php`.

### 🚀 Fase 4: Módulo de Clientes (CRUD Completo)
*   **Objetivo**: Integrar la gestión de clientes en [clientes.php](file:///c:/Users/marco/OneDrive/Escritorio/Carpetas_Facultad/productio/pages/clientes.php) con la tabla de datos, estilos y modales del prototipo de Figma.

### 🚀 Fase 5: Módulo de Productos (CRUD Completo)
*   **Objetivo**: Integrar el catálogo de productos en [productos.php](file:///c:/Users/marco/OneDrive/Escritorio/Carpetas_Facultad/productio/pages/productos.php) permitiendo clasificar los productos por familias (SERVILLETAS, BOLSITAS, TROQUELADOS, PAJITAS, VASOS) y registrar su gramaje y color.
