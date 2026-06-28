<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$is_app_page = (basename($_SERVER['PHP_SELF']) !== 'onboarding.php' && basename($_SERVER['PHP_SELF']) !== 'login.php');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRODUCT-IO</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <div id="notification-container"></div>
    <?php if ($is_app_page): ?>
    <div class="app">
    <?php endif; ?>
