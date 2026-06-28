<?php
/**
 * api/clientes/guardar.php
 * Endpoint para crear o actualizar un cliente.
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

// Leer datos del cuerpo POST (puede ser JSON o Form-data)
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$id = isset($input['id']) && !empty($input['id']) ? intval($input['id']) : null;
$nombre = isset($input['nombre']) ? trim($input['nombre']) : '';
$contacto = isset($input['contacto']) ? trim($input['contacto']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';

if (empty($nombre)) {
    echo json_encode(['success' => false, 'error' => 'El nombre del cliente es obligatorio.']);
    exit;
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'El formato de email no es válido.']);
    exit;
}

try {
    if ($id) {
        // Actualizar cliente existente y validar que pertenezca a la misma fábrica para evitar alteraciones maliciosas
        $stmt = $pdo->prepare("
            UPDATE clientes 
            SET nombre = ?, contacto = ?, email = ? 
            WHERE id = ? AND fabrica_id = ?
        ");
        $stmt->execute([$nombre, $contacto, $email, $id, $fabrica_id]);
        
        if ($stmt->rowCount() === 0) {
            // Verificar si el cliente realmente existe
            $check = $pdo->prepare("SELECT id FROM clientes WHERE id = ? AND fabrica_id = ?");
            $check->execute([$id, $fabrica_id]);
            if (!$check->fetch()) {
                echo json_encode(['success' => false, 'error' => 'El cliente no existe o no pertenece a esta fábrica.']);
                exit;
            }
        }
        
        echo json_encode(['success' => true, 'message' => 'Cliente actualizado correctamente.']);
    } else {
        // Crear nuevo cliente
        $stmt = $pdo->prepare("
            INSERT INTO clientes (nombre, contacto, email, fabrica_id) 
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$nombre, $contacto, $email, $fabrica_id]);
        
        echo json_encode(['success' => true, 'message' => 'Cliente creado correctamente.', 'id' => $pdo->lastInsertId()]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al guardar cliente: ' . $e->getMessage()]);
}
?>
