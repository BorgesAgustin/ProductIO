<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ProductIO - Sistema de Costeo</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <div id="notification-container"></div>
    <header class="main-header">
        <div class="header-content">
            <div class="logo">
                <span class="logo-accent">Product</span>IO
            </div>
            <?php if(isset($_SESSION['user_id'])): ?>
            <div class="user-meta">
                <span class="username"><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <a href="../api/auth/logout.php" class="logout-link">Cerrar Sesión</a>
            </div>
            <?php endif; ?>
        </div>
    </header>
    <main class="main-content">
