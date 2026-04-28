# /specs/SPEC-07-Manejo-de-Errores-y-Notificaciones.md

**Autor: Briant Gauna**

## Objetivo

Definir cómo se comunican los resultados de las operaciones al usuario final.

## Respuestas del Servidor

Todos los microservicios deben seguir el formato definido en `SPEC-03`:
- **Éxito**: `{"success": true, "data": ...}`
- **Error**: `{"success": false, "error": "Mensaje descriptivo"}`

## Interfaz de Usuario (Frontend)

### Notificaciones
- Se debe implementar un sistema de notificaciones visuales (Toasts o Alerts) que aparezca en la parte superior o inferior de la pantalla.
- **Verde**: Operaciones exitosas (ej: "Cliente guardado correctamente").
- **Rojo**: Errores (ej: "No se pudo conectar con el servidor").

### Comportamiento en JS
Cada llamada `fetch` debe procesar el error de forma centralizada o estandarizada:

```javascript
fetch('../api/modulo/accion.php')
    .then(r => r.json())
    .then(res => {
        if (res.success) {
            mostrarExito(res.message || 'Operación exitosa');
        } else {
            mostrarError(res.error || 'Error desconocido');
        }
    })
    .catch(err => {
        mostrarError('Error crítico de red');
    });
```

## Criterios
- No usar `alert()` nativo del navegador.
- Los mensajes de error deben ser amigables para el usuario pero lo suficientemente descriptivos para debugging.
