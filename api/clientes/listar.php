<?php
/**
 * api/clientes/listar.php
 * Endpoint para listar los clientes de la fábrica activa.
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
    $stmt = $pdo->prepare("SELECT * FROM clientes WHERE fabrica_id = ? ORDER BY nombre ASC");
    $stmt->execute([$fabrica_id]);
    $clientes = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $clientes]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al listar clientes: ' . $e->getMessage()]);
}
?>
