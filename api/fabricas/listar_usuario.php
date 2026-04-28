<?php
/**
 * api/fabricas/listar_usuario.php
 */
require_once '../../config/database.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'No autorizado']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT f.* FROM fabricas f
        JOIN usuario_fabricas uf ON f.id = uf.fabrica_id
        WHERE uf.usuario_id = ?
    ");
    $stmt->execute([$_SESSION['user_id']]);
    $fabricas = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $fabricas]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al consultar fábricas']);
}
?>
