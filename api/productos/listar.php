<?php
/**
 * api/productos/listar.php
 * Endpoint para listar los productos de la fábrica activa.
 */
require_once '../../config/database.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'No autorizado']);
    exit;
}

if (!isset($_SESSION['fabrica_id'])) {
    echo json_encode(['success' => false, 'error' => 'No se ha seleccionado fábrica']);
    exit;
}

$fabrica_id = intval($_SESSION['fabrica_id']);

try {
    $stmt = $pdo->prepare("SELECT * FROM productos WHERE fabrica_id = ? ORDER BY sku ASC");
    $stmt->execute([$fabrica_id]);
    $productos = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $productos]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al listar productos: ' . $e->getMessage()]);
}
?>
