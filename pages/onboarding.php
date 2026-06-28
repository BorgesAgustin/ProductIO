<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
?>

<div class="onboarding-container">
    <div class="onboarding-header">
        <h1>Bienvenido, <?php echo htmlspecialchars($_SESSION['nombre']); ?></h1>
        <p>Selecciona la fábrica con la que deseas trabajar hoy.</p>
    </div>

    <div id="fabricas-grid" class="fabricas-grid">
        <!-- Se cargará dinámicamente -->
        <p class="loading">Cargando fábricas...</p>
    </div>
</div>

<style>
    .onboarding-container { max-width: 800px; margin: 4rem auto; text-align: center; }
    .onboarding-header { margin-bottom: 3rem; }
    .fabricas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .fabrica-card { 
        background: white; padding: 2rem; border-radius: var(--radius); 
        box-shadow: var(--shadow); border: 1px solid var(--border);
        cursor: pointer; transition: all 0.2s;
    }
    .fabrica-card:hover { transform: translateY(-5px); border-color: var(--primary); }
    .fabrica-card h3 { color: var(--primary); margin-bottom: 0.5rem; }
</style>

<script src="../assets/js/common.js"></script>
<script src="../assets/js/onboarding.js"></script>

<?php include '../partials/footer.php'; ?>
