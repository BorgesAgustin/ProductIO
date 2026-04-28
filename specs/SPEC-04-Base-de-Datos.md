# /specs/SPEC-04-Base-de-Datos.md

## Objetivo

Definir reglas generales para SQL.

## Reglas

- Toda conexión debe centralizarse en `/config/database.php`.
- No repetir credenciales de base de datos.
- No escribir SQL en HTML.
- No escribir SQL en JavaScript.
- Usar consultas preparadas.
- Validar datos también en backend.

## Archivo recomendado

```text
/sql/schema.sql
```

## Conexión recomendada

```text
/config/database.php
```
