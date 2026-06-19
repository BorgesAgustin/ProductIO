<?php
/**
 * api/productos/eliminar.php
 * Endpoint para eliminar un producto.
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

// Obtener ID del producto a eliminar
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$id = isset($input['id']) ? intval($input['id']) : null;

if (!$id) {
    echo json_encode(['success' => false, 'error' => 'ID de producto no proporcionado.']);
    exit;
}

try {
    // Eliminar y validar fábrica
    $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ? AND fabrica_id = ?");
    $stmt->execute([$id, $fabrica_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Producto eliminado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'error' => 'No se encontró el producto o no pertenece a esta fábrica.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al eliminar producto: ' . $e->getMessage()]);
}
?>
