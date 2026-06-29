<?php
// /config/database.php
// Cargar credenciales desde variables de entorno (para producción)
$host = getenv('DB_HOST');
$db   = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$charset = 'utf8mb4';

// Fallback al archivo local si no están definidas en el entorno
if (!$host || !$db || !$user) {
    $localConfigPath = __DIR__ . '/database.local.php';
    if (file_exists($localConfigPath)) {
        include $localConfigPath;
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Configuración de base de datos no encontrada.']);
        exit;
    }
}

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
     echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
     exit;
}
?>
