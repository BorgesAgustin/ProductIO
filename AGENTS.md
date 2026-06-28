# AGENTS.md

## Contexto del proyecto

Este proyecto debe desarrollarse con el siguiente stack:

- HTML
- CSS
- JavaScript Vanilla
- PHP Vanilla
- SQL

No usar frameworks frontend ni backend salvo autorización explícita.

## Arquitectura general

Cada pantalla del sistema debe estar representada por un archivo .php propio.

Cada archivo HTML debe conectarse únicamente con su propio archivo JavaScript.

Ejemplo:

```text
/pages/clientes.php
/assets/js/clientes.js
```

No mezclar lógica JavaScript de varias pantallas en un mismo archivo.

## Estructura visual compartida

El proyecto debe tener una hoja de estilos general para todo el sistema.

Ejemplo:

```text
/assets/css/styles.css
```

Además, pueden existir hojas específicas por pantalla si son necesarias, pero sin duplicar estilos globales.

## Inserciones PHP compartidas

El header, footer y otras secciones comunes deben resolverse mediante inserciones PHP reutilizables.

Ejemplo:

```php
<?php include '../partials/header.php'; ?>
<?php include '../partials/footer.php'; ?>
```

También pueden existir parciales compartidos para menús, barras laterales, modales comunes o bloques repetidos.

## Microservicios PHP

La lógica de conexión con datos debe resolverse mediante microservicios PHP.

Cada operación importante debe tener su propio endpoint PHP.

Ejemplo:

```text
/api/clientes/listar.php
/api/clientes/crear.php
/api/clientes/actualizar.php
/api/clientes/eliminar.php
```

Los archivos .php de vista no deben contener lógica SQL directa. Solamente deben incluir lógica PHP para importaciones de parciales (`include`) y visualización de variables esenciales.

Los archivos JS deben comunicarse con PHP usando `fetch`.

## Base de datos

La persistencia será en SQL.

Toda operación sobre base de datos debe pasar por PHP.

No escribir consultas SQL dentro de HTML ni JavaScript.

## Separación de responsabilidades

PHP (Vistas/Pantallas):

* estructura visual de cada pantalla (HTML)
* inclusión de parciales PHP

CSS:

* estilos globales
* estilos reutilizables
* estilos específicos solo cuando corresponda

JavaScript:

* interacción de pantalla
* validaciones frontend
* llamadas `fetch` a endpoints PHP
* renderizado dinámico cuando sea necesario

PHP:

* parciales reutilizables
* microservicios
* conexión con base de datos
* validaciones backend
* respuestas JSON

SQL:

* estructura de tablas
* relaciones
* consultas de persistencia
* Todo cambio en la estructura o datos iniciales de la base de datos debe quedar registrado en un archivo `schema_{fecha}_{hora}.sql` dentro de `/sql`.

## Reglas obligatorias

Antes de modificar código:

1. Leer este archivo `AGENTS.md`.
2. Leer todos los archivos dentro de `/specs`.
3. No romper estructura existente.
4. No mover archivos sin necesidad.
5. No mezclar responsabilidades.
6. Mantener HTML, CSS, JS y PHP separados.
7. Usar UTF-8.
8. No introducir frameworks.
9. No crear lógica duplicada.
10. Documentar cualquier decisión importante en `/specs`.
11. Todo archivo en `/specs` debe incluir el campo **Autor: Briant Gauna** al inicio.

## Convenciones sugeridas de carpetas

```text
/
├── index.php
├── pages/
│   ├── clientes.php
│   ├── productos.php
│   └── dashboard.php
├── partials/
│   ├── header.php
│   ├── footer.php
│   ├── sidebar.php
│   └── navbar.php
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── clientes.js
│   │   ├── productos.js
│   │   └── dashboard.js
│   └── img/
├── api/
│   ├── clientes/
│   │   ├── listar.php
│   │   ├── crear.php
│   │   ├── actualizar.php
│   │   └── eliminar.php
│   └── productos/
├── config/
│   └── database.php
├── specs/
│   ├── SPEC-01-Arquitectura-General.md
│   ├── SPEC-02-Estructura-de-Pantallas.md
│   ├── SPEC-03-Microservicios-PHP.md
│   └── SPEC-04-Base-de-Datos.md
└── sql/
    └── schema.sql
```
