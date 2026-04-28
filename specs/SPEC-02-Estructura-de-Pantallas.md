# /specs/SPEC-02-Estructura-de-Pantallas.md

## Objetivo

Definir cómo deben construirse las pantallas.

## Regla

Cada pantalla debe ser independiente.

Ejemplo:

```text
/pages/clientes.php
/assets/js/clientes.js
```

## Cada pantalla puede incluir

```php
<?php include '../partials/header.php'; ?>
<?php include '../partials/sidebar.php'; ?>
<?php include '../partials/footer.php'; ?>
```

## Cada pantalla debe cargar su JS específico

```html
<script src="../assets/js/clientes.js"></script>
```

## Cada pantalla debe usar estilos globales

```html
<link rel="stylesheet" href="../assets/css/styles.css">
```

## Criterios

* El HTML define estructura.
* El JS define comportamiento.
* El PHP compartido define bloques reutilizables.
* La pantalla no debe contener consultas SQL.
