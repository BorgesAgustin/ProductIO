# /specs/SPEC-08-Seguridad-y-Sesiones.md

**Autor: Briant Gauna**

## Objetivo

Centralizar el control de acceso y la integridad de la sesión del usuario.

## Validación de Sesión en Backend

### Para Pantallas (.php)
Cada pantalla debe incluir un chequeo de sesión al inicio, antes de cualquier HTML:
```php
<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
// Si no es la pantalla de onboarding y no tiene fábrica seleccionada
if (basename($_SERVER['PHP_SELF']) != 'onboarding.php' && !isset($_SESSION['fabrica_id'])) {
    header('Location: onboarding.php');
    exit;
}
?>
```

### Para Microservicios (API)
Cada endpoint debe verificar que existe una sesión activa:
```php
<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Sesión no autorizada']);
    exit;
}
?>
```

## Variables de Sesión Estándar
- `user_id`: Identificador único del usuario.
- `username`: Nombre para mostrar.
- `fabrica_id`: ID de la fábrica actualmente gestionada (contexto).

## Criterios de Seguridad
- El `fabrica_id` debe ser validado en cada operación de escritura/lectura para asegurar que el usuario tiene acceso a esa fábrica específica.
- Al cerrar sesión (`logout.php`), se deben destruir todas las variables y la sesión (`session_destroy()`).
