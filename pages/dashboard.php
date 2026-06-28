<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
include '../partials/sidebar.php';
?>

<div class="dashboard-content">
    <div class="dashboard-welcome card" style="margin-bottom: 2rem;">
        <h1 style="margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif;">Panel de Control</h1>
        <p id="welcome-message">Cargando información de fábrica...</p>
    </div>

    <!-- Grid de métricas -->
    <div class="dashboard-grid">
        <div class="metric-card">
            <div class="metric-header">
                <span>Lotes Activos Hoy</span>
                <span class="icon">🏭</span>
            </div>
            <div class="metric-value" id="val-lotes-activos">-</div>
            <div class="metric-footer" id="footer-lotes-activos">
                <!-- Se cargará con JS -->
            </div>
        </div>

        <div class="metric-card">
            <div class="metric-header">
                <span>Costo Promedio por Lote</span>
                <span class="icon">💵</span>
            </div>
            <div class="metric-value" id="val-costo-promedio">-</div>
            <div class="metric-footer" id="footer-costo-promedio">
                <!-- Se cargará con JS -->
            </div>
        </div>

        <div class="metric-card">
            <div class="metric-header">
                <span>Eficiencia de Línea</span>
                <span class="icon">📈</span>
            </div>
            <div class="metric-value" id="val-eficiencia">-</div>
            <div class="metric-footer" id="footer-eficiencia">
                <!-- Se cargará con JS -->
            </div>
        </div>

        <div class="metric-card" style="border-left: 4px solid var(--danger);">
            <div class="metric-header">
                <span>Alertas Pendientes</span>
                <span class="icon" style="color: var(--danger);">⚠️</span>
            </div>
            <div class="metric-value" id="val-alertas" style="color: var(--danger);">-</div>
            <div class="metric-footer">
                <span class="trend-neutral">Requieren atención inmediata</span>
            </div>
        </div>
    </div>

    <!-- Detalles e información de datos maestros -->
    <div class="dashboard-details">
        <!-- Gráfico de barras -->
        <div class="chart-card">
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; margin-bottom: 1.5rem;">Rendimiento por Línea de Producción</h2>
            <div class="chart-container" id="rendimiento-chart">
                <!-- Las barras se generarán dinámicamente con JS -->
            </div>
        </div>

        <!-- Tarjeta de información rápida de datos maestros -->
        <div class="info-card">
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; margin-bottom: 1.5rem;">Resumen de Datos</h2>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 600;">Clientes</h3>
                        <p style="color: var(--text-muted); font-size: 0.85rem;">En la fábrica actual</p>
                    </div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);" id="val-cant-clientes">-</div>
                </div>
                <hr style="border:0; border-top: 1px solid var(--border);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.1rem; font-weight: 600;">Productos</h3>
                        <p style="color: var(--text-muted); font-size: 0.85rem;">En catálogo activo</p>
                    </div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);" id="val-cant-productos">-</div>
                </div>
                <hr style="border:0; border-top: 1px solid var(--border);">
                <div style="text-align: center; margin-top: 0.5rem;">
                    <a href="onboarding.php" class="btn btn-primary" style="width: auto; padding: 0.5rem 1rem; font-size: 0.85rem;">Cambiar de Fábrica</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../assets/js/dashboard.js"></script>

<?php include '../partials/footer.php'; ?>
