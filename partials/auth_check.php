<?php
/**
 * partials/auth_check.php
 * Middleware de seguridad para proteger rutas
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Verificar si el usuario está logueado
if (!isset($_SESSION['user_id'])) {
    if (strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'No autorizado']);
        exit;
    } else {
        header('Location: login.php');
        exit;
    }
}

// Verificar si tiene fábrica seleccionada (excepto en onboarding)
$currentPage = basename($_SERVER['PHP_SELF']);
if ($currentPage !== 'onboarding.php' && !isset($_SESSION['fabrica_id'])) {
    if (strpos($_SERVER['REQUEST_URI'], '/api/') === false) {
        header('Location: onboarding.php');
        exit;
    }
}
