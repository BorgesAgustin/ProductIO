<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
?>

<main class="onboarding-page">
    <div class="onboarding-page__inner">
        <div class="onboarding-page__header">
            <h1 class="onboarding-page__title">Bienvenido, <?php echo htmlspecialchars($_SESSION['nombre']); ?></h1>
            <p class="onboarding-page__subtitle">Selecciona la fábrica con la que deseas trabajar hoy.</p>
        </div>

        <div id="fabricas-grid" class="fabricas-grid">
            <p class="fabricas-grid__loading">Cargando fábricas...</p>
        </div>
    </div>
</main>

<script src="../assets/js/common.js"></script>
<script src="../assets/js/onboarding.js"></script>

<?php include '../partials/footer.php'; ?>
