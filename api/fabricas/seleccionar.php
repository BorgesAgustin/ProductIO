<?php
/**
 * api/fabricas/seleccionar.php
 */
require_once '../../config/database.php';
session_start();

header('Content-Type: application/json');

$id = $_POST['id'] ?? '';

if (empty($id)) {
    echo json_encode(['success' => false, 'error' => 'ID de fábrica no proporcionado']);
    exit;
}

// Validar que el usuario tiene acceso a esta fábrica
try {
    $stmt = $pdo->prepare("SELECT 1 FROM usuario_fabricas WHERE usuario_id = ? AND fabrica_id = ?");
    $stmt->execute([$_SESSION['user_id'], $id]);
    
    if ($stmt->fetch()) {
        $_SESSION['fabrica_id'] = $id;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No tiene acceso a esta fábrica']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al procesar selección']);
}
?>
