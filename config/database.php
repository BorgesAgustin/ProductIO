<?php
// /config/database.php
$host = 'pdb1049.awardspace.net';
$db   = '3434352_productio';
$user = '3434352_productio';
$pass = 'PRODUCTio098*';
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
     echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos']);
     exit;
}
?>
