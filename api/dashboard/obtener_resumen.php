<?php
/**
 * api/dashboard/obtener_resumen.php
 * Endpoint para obtener el resumen de estadísticas de la fábrica activa.
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
    // 1. Obtener datos reales de la base de datos (Clientes y Productos de esta fábrica)
    $stmtClientes = $pdo->prepare("SELECT COUNT(*) as total FROM clientes WHERE fabrica_id = ?");
    $stmtClientes->execute([$fabrica_id]);
    $totalClientes = $stmtClientes->fetch()['total'];

    $stmtProductos = $pdo->prepare("SELECT COUNT(*) as total FROM productos WHERE fabrica_id = ?");
    $stmtProductos->execute([$fabrica_id]);
    $totalProductos = $stmtProductos->fetch()['total'];

    // 2. Generar métricas operativas basadas en el contexto de la fábrica seleccionada
    // DATOS SIMULADOS: el módulo de Producción/Lotes está fuera del alcance del Sprint TP4 (ver PB01-PB04). Reemplazar por queries reales cuando se implemente la tabla lotes.
    if ($fabrica_id === 1) {
        $resumen = [
            'nombre_fabrica' => 'Fábrica Norte',
            'lotes_activos' => 12,
            'lotes_activos_var' => '+15%',
            'costo_promedio' => 104920,
            'costo_promedio_var' => '-3.2%',
            'eficiencia' => 87.5,
            'eficiencia_var' => '+5.1%',
            'alertas' => 3,
            'cant_clientes' => $totalClientes,
            'cant_productos' => $totalProductos,
            'kpis_produccion_simulados' => true,
            'kpis_maestros_simulados' => false,
            'rendimiento_lineas' => [
                ['linea' => 'L1 Servilletas', 'valor' => 8200, 'costo' => 38000],
                ['linea' => 'L2 Bolsitas', 'valor' => 5500, 'costo' => 22000],
                ['linea' => 'L3 Troquelados', 'valor' => 7800, 'costo' => 31000],
                ['linea' => 'L4 Pajitas', 'valor' => 9200, 'costo' => 18000],
                ['linea' => 'L5 Vasos', 'valor' => 4100, 'costo' => 25000]
            ]
        ];
    } else if ($fabrica_id === 2) {
        $resumen = [
            'nombre_fabrica' => 'Fábrica Sur',
            'lotes_activos' => 8,
            'lotes_activos_var' => '+5%',
            'costo_promedio' => 87450,
            'costo_promedio_var' => '+2.1%',
            'eficiencia' => 82.1,
            'eficiencia_var' => '-1.2%',
            'alertas' => 1,
            'cant_clientes' => $totalClientes,
            'cant_productos' => $totalProductos,
            'kpis_produccion_simulados' => true,
            'kpis_maestros_simulados' => false,
            'rendimiento_lineas' => [
                ['linea' => 'L1 Servilletas', 'valor' => 7100, 'costo' => 33000],
                ['linea' => 'L2 Bolsitas', 'valor' => 6400, 'costo' => 26000],
                ['linea' => 'L3 Troquelados', 'valor' => 6900, 'costo' => 28000],
                ['linea' => 'L4 Pajitas', 'valor' => 8500, 'costo' => 17000],
                ['linea' => 'L5 Vasos', 'valor' => 5200, 'costo' => 29000]
            ]
        ];
    } else {
        // Para cualquier otra fábrica agregada
        $resumen = [
            'nombre_fabrica' => 'Fábrica General #' . $fabrica_id,
            'lotes_activos' => 5,
            'lotes_activos_var' => '0%',
            'costo_promedio' => 50000,
            'costo_promedio_var' => '0%',
            'eficiencia' => 75.0,
            'eficiencia_var' => '0%',
            'alertas' => 0,
            'cant_clientes' => $totalClientes,
            'cant_productos' => $totalProductos,
            'kpis_produccion_simulados' => true,
            'kpis_maestros_simulados' => false,
            'rendimiento_lineas' => [
                ['linea' => 'L1 Servilletas', 'valor' => 5000, 'costo' => 20000],
                ['linea' => 'L2 Bolsitas', 'valor' => 5000, 'costo' => 20000],
                ['linea' => 'L3 Troquelados', 'valor' => 5000, 'costo' => 20000],
                ['linea' => 'L4 Pajitas', 'valor' => 5000, 'costo' => 20000],
                ['linea' => 'L5 Vasos', 'valor' => 5000, 'costo' => 20000]
            ]
        ];
    }

    echo json_encode(['success' => true, 'data' => $resumen]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error al procesar el resumen del dashboard: ' . $e->getMessage()]);
}
?>
