# /specs/SPEC-05-Control-de-Cambios-SQL.md

**Autor: Briant Gauna**

## Objetivo

Garantizar la trazabilidad de los cambios realizados en la base de datos.

## Regla

Todo cambio que se aplique en la base de datos (creación de tablas, alteración de columnas, inserción de datos maestros, etc.) debe guardarse en un archivo SQL independiente.

## Formato de nombre de archivo

El archivo debe seguir el siguiente patrón:
`sql/schema_{fecha}_{hora}.sql`

Donde:
* `{fecha}`: YYYYMMDD (ejemplo: 20260428)
* `{hora}`: HHMMSS (ejemplo: 112200)

Ejemplo completo: `sql/schema_20260428_112200.sql`

## Criterios

* No se debe modificar el archivo `schema.sql` principal directamente para cambios incrementales sin dejar el rastro en los archivos de esquema con timestamp.
* Cada archivo debe contener el SQL necesario para aplicar el cambio.
* Se recomienda documentar brevemente el propósito del cambio dentro del archivo SQL usando comentarios.
