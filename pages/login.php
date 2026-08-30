<?php
// pages/login.php
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRODUCT-IO — Iniciar sesión</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <div id="notification-container"></div>
    
    <main class="login-page">
        <div class="login-card">
            <!-- Logo -->
            <div class="login-card__logo">
                <div class="login-card__logo-mark">P</div>
                <div class="login-card__logo-text">
                    <div class="login-card__logo-name">PRODUCT-IO</div>
                    <div class="login-card__logo-company">Papelera K&amp;A</div>
                </div>
            </div>

            <!-- Heading -->
            <h1 class="login-card__heading">Bienvenido</h1>
            <p class="login-card__sub">Ingrese sus credenciales para continuar</p>

            <!-- Error message (shown by JS) -->
            <div id="login-error" class="login-card__error" role="alert">
                Usuario o contraseña incorrectos.
            </div>

            <!-- Form -->
            <form id="login-form" class="login-card__form" novalidate>
                <div class="form-field">
                    <label class="form-field__label form-field__label--required" for="username">
                        Usuario
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        class="form-field__input"
                        placeholder="admin o demo"
                        autocomplete="username"
                        required>
                </div>

                <div class="form-field">
                    <label class="form-field__label form-field__label--required" for="password">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        class="form-field__input"
                        placeholder="••••••••"
                        autocomplete="current-password"
                        required>
                </div>

                <button type="submit" class="btn btn--primary btn--lg" style="width:100%">
                    Iniciar sesión
                </button>
            </form>
        </div>
    </main>

    <script src="../assets/js/common.js"></script>
    <script src="../assets/js/login.js"></script>
</body>
</html>
