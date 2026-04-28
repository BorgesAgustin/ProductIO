# /specs/SPEC-03-Microservicios-PHP.md

## Objetivo

Definir la comunicación entre frontend y backend.

## Regla

Toda conexión con datos debe hacerse mediante endpoints PHP.

## Ejemplo de endpoints

```text
/api/clientes/listar.php
/api/clientes/crear.php
/api/clientes/actualizar.php
/api/clientes/eliminar.php
```

## Formato de respuesta

Los endpoints deben responder JSON.

Ejemplo:

```json
{
  "success": true,
  "data": []
}
```

## Formato de error

```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

## Comunicación frontend

El JS debe usar `fetch`.

Ejemplo:

```js
fetch('../api/clientes/listar.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```
