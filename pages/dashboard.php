<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
include '../partials/sidebar.php';
?>

<div class="dashboard-content">
    <div class="card">
        <h1>Dashboard</h1>
        <p>Has seleccionado la fábrica con ID #<?php echo $_SESSION['fabrica_id']; ?></p>
        <p>Bienvenido al Panel de Control de ProductIO.</p>
    </div>
</div>

<?php include '../partials/footer.php'; ?>
