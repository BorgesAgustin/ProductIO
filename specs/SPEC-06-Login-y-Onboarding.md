# /specs/SPEC-06-Login-y-Onboarding.md

**Autor: Briant Gauna**

## Objetivo

Definir el flujo de autenticación y selección de contexto de trabajo (fábrica).

## Pantalla: Login

* **Archivo**: `/pages/login.php`
* **JS**: `/assets/js/login.js`
* **Endpoint**: `/api/auth/login.php`

### Comportamiento
- El usuario ingresa credenciales (email/usuario y contraseña).
- Al autenticarse correctamente, el sistema redirige a la pantalla de Onboarding.
- Se debe manejar sesión en backend (PHP `session_start`).

## Pantalla: Onboarding (Selección de Fábrica)

* **Archivo**: `/pages/onboarding.php`
* **JS**: `/assets/js/onboarding.js`
* **Endpoint**: `/api/fabricas/listar_usuario.php`

### Comportamiento
- Esta pantalla es el primer paso después del login exitoso.
- El sistema consulta mediante el endpoint las fábricas asociadas al usuario logueado.
- Se muestran las fábricas disponibles en formato de tarjetas o lista.
- Al seleccionar una fábrica, se guarda el ID de la fábrica en la sesión y se redirige al dashboard principal.

## Microservicios requeridos

### /api/auth/login.php
- Recibe: `username`, `password`.
- Procesa: Verifica credenciales en la tabla `usuarios`.
- Responde: JSON indicando éxito o error.

### /api/fabricas/listar_usuario.php
- Recibe: (toma el ID de usuario de la sesión).
- Procesa: Consulta las fábricas vinculadas al usuario.
- Responde: JSON con el listado de fábricas.

## Reglas de Navegación
- No se puede acceder a ninguna pantalla del sistema (salvo login) sin una sesión activa.
- Si hay sesión activa pero no se ha seleccionado fábrica, se debe forzar el redireccionamiento a Onboarding.
