# /specs/SPEC-04-Base-de-Datos.md

**Autor: Briant Gauna**

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
```php
// /config/database.php
<?php
$host = 'localhost';
$db   = 'nombre_base_datos';
$user = 'usuario';
$pass = 'contraseña';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     header('Content-Type: application/json');
     echo json_encode(['success' => false, 'error' => 'Error de conexión']);
     exit;
}
?>
```

## Reglas Adicionales
- Usar siempre **PDO** para evitar inyecciones SQL.
- El archivo `database.php` solo inicializa la conexión, no ejecuta consultas.
