<?php
/**
 * api/productos/guardar.php
 * Endpoint para crear o actualizar un producto.
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

// Leer datos del cuerpo POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$id = isset($input['id']) && !empty($input['id']) ? intval($input['id']) : null;
$sku = isset($input['sku']) ? trim($input['sku']) : '';
$nombre = isset($input['nombre']) ? trim($input['nombre']) : '';
$familia = isset($input['familia']) ? strtoupper(trim($input['familia'])) : '';
$gramaje = isset($input['gramaje']) && $input['gramaje'] !== '' ? floatval($input['gramaje']) : null;
$color = isset($input['color']) ? trim($input['color']) : '';
$descripcion = isset($input['descripcion']) ? trim($input['descripcion']) : '';
$estado = isset($input['estado']) ? intval($input['estado']) : 1;

if (empty($sku) || empty($nombre) || empty($familia)) {
    echo json_encode(['success' => false, 'error' => 'Los campos SKU, Nombre y Familia son obligatorios.']);
    exit;
}

// Validar que la familia de producto sea una de las válidas
$familiasValidas = ['SERVILLETAS', 'BOLSITAS', 'TROQUELADOS', 'PAJITAS', 'VASOS'];
if (!in_array($familia, $familiasValidas)) {
    echo json_encode(['success' => false, 'error' => 'Familia de producto inválida. Valores permitidos: ' . implode(', ', $familiasValidas)]);
    exit;
}

try {
    // Validar unicidad del SKU dentro de la fábrica activa
    if ($id) {
        $stmtCheck = $pdo->prepare("SELECT id FROM productos WHERE sku = ? AND fabrica_id = ? AND id != ?");
        $stmtCheck->execute([$sku, $fabrica_id, $id]);
    } else {
        $stmtCheck = $pdo->prepare("SELECT id FROM productos WHERE sku = ? AND fabrica_id = ?");
        $stmtCheck->execute([$sku, $fabrica_id]);
    }

    if ($stmtCheck->fetch()) {
        echo json_encode(['success' => false, 'error' => 'El código SKU ya existe en esta fábrica.']);
        exit;
    }

    if ($id) {
        // Actualizar
        $stmt = $pdo->prepare("
            UPDATE productos 
            SET sku = ?, nombre = ?, familia = ?, gramaje = ?, color = ?, descripcion = ?, estado = ?
            WHERE id = ? AND fabrica_id = ?
        ");
        $stmt->execute([$sku, $nombre, $familia, $gramaje, $color, $descripcion, $estado, $id, $fabrica_id]);
        
        echo json_encode(['success' => true, 'message' => 'Producto actualizado correctamente.']);
    } else {
        // Crear
        $stmt = $pdo->prepare("
            INSERT INTO productos (sku, nombre, familia, gramaje, color, descripcion, estado, fabrica_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$sku, $nombre, $familia, $gramaje, $color, $descripcion, $estado, $fabrica_id]);
        
        echo json_encode(['success' => true, 'message' => 'Producto creado correctamente.', 'id' => $pdo->lastInsertId()]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al guardar producto: ' . $e->getMessage()]);
}
?>
