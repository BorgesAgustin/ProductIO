<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
include '../partials/sidebar.php';
?>

<!-- Page header -->
<div class="page-header">
  <div class="page-header__titles">
    <h1 class="page-header__title">Dashboard</h1>
    <p class="page-header__subtitle" id="welcome-message">Cargando información de fábrica...</p>
  </div>
  <div class="page-header__actions">
    <span class="text-sm text-muted">Actualizado: hace 5 min</span>
  </div>
</div>

<!-- KPI Cards -->
<div class="kpi-grid--4 section-gap">

  <div class="kpi-card">
    <div class="kpi-card__header">
      <span class="kpi-card__label">Lotes activos</span>
      <div class="kpi-card__icon kpi-card__icon--primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 8h14M5 8a2 2 0 010-4h14a2 2 0 010 4M5 8l1 12h12l1-12"/>
        </svg>
      </div>
    </div>
    <div class="kpi-card__value" id="val-lotes-activos">-</div>
    <div class="kpi-card__trend" id="footer-lotes-activos">
      <!-- Cargado por JS -->
    </div>
  </div>

  <div class="kpi-card">
    <div class="kpi-card__header">
      <span class="kpi-card__label">Costo promedio/lote</span>
      <div class="kpi-card__icon kpi-card__icon--success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      </div>
    </div>
    <div class="kpi-card__value" id="val-costo-promedio">-</div>
    <div class="kpi-card__trend" id="footer-costo-promedio">
      <!-- Cargado por JS -->
    </div>
  </div>

  <div class="kpi-card">
    <div class="kpi-card__header">
      <span class="kpi-card__label">Eficiencia global</span>
      <div class="kpi-card__icon kpi-card__icon--secondary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      </div>
    </div>
    <div class="kpi-card__value" id="val-eficiencia">-</div>
    <div class="kpi-card__trend" id="footer-eficiencia">
      <!-- Cargado por JS -->
    </div>
  </div>

  <div class="kpi-card">
    <div class="kpi-card__header">
      <span class="kpi-card__label">Alertas pendientes</span>
      <div class="kpi-card__icon kpi-card__icon--danger">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
    </div>
    <div class="kpi-card__value" id="val-alertas">-</div>
    <div class="kpi-card__trend kpi-card__trend--negative" style="display: inline-flex; align-items: center; gap: 4px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;">
        <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
      </svg>
      <span>Requieren atención</span>
    </div>
  </div>

</div>

<!-- Charts + Alerts row -->
<div class="grid grid--2 section-gap" style="grid-template-columns: 2fr 1fr; display: grid; gap: var(--space-6);">

  <!-- Chart box -->
  <div class="chart-box">
    <div class="chart-box__header">
      <div>
        <div class="chart-box__title">Producción por línea</div>
        <div class="chart-box__subtitle">Unidades y costo — Junio 2026</div>
      </div>
    </div>
    <div class="chart-box__canvas" style="height:260px">
      <canvas id="chart-production-lines"></canvas>
    </div>
  </div>

  <!-- Alerts + Resumen Datos Maestros -->
  <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- Tarjeta de alertas recientes -->
      <div class="card">
        <div class="card__header">
          <h2 class="card__title">Alertas recientes</h2>
          <span class="badge badge--alert">3 activas</span>
        </div>
        <div class="card__body" style="display:flex;flex-direction:column;gap:var(--space-3);padding:var(--space-4)">
          <div class="alert-item alert-item--danger">
            <svg class="alert-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div class="alert-item__body">
              <div class="alert-item__title">Costo fuera de rango — L3</div>
              <div class="alert-item__meta">Lote LOT-20260628-003 · Reciente</div>
            </div>
          </div>
          <div class="alert-item alert-item--warning">
            <svg class="alert-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div class="alert-item__body">
              <div class="alert-item__title">Stock bajo: Papel Kraft 80g</div>
              <div class="alert-item__meta">Quedan pocas unidades</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen Datos Maestros -->
      <div class="card">
        <div class="card__header">
          <h2 class="card__title">Resumen de Datos</h2>
        </div>
        <div class="card__body" style="display:flex;flex-direction:column;gap:var(--space-3);padding:var(--space-4)">
          <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                  <h3 style="font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); color: var(--color-text-primary);">Clientes</h3>
                  <p style="color: var(--color-text-muted); font-size: var(--font-size-xs);">En la fábrica actual</p>
              </div>
              <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-primary);" id="val-cant-clientes">-</div>
          </div>
          <hr style="border:0; border-top: 1px solid var(--color-border);">
          <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                  <h3 style="font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); color: var(--color-text-primary);">Productos</h3>
                  <p style="color: var(--color-text-muted); font-size: var(--font-size-xs);">En catálogo activo</p>
              </div>
              <div style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-primary);" id="val-cant-productos">-</div>
          </div>
        </div>
      </div>
  </div>

</div>

<!-- Recent batches table -->
<div class="card section-gap">
  <div class="card__header">
    <h2 class="card__title">Lotes recientes</h2>
    <span class="text-sm text-muted">Últimos movimientos registrados</span>
  </div>
  <div class="table-wrapper" style="border:none;box-shadow:none;border-radius:0">
    <table class="data-table">
      <thead class="data-table__head">
        <tr>
          <th>ID Lote</th>
          <th>SKU</th>
          <th>Familia</th>
          <th>Línea</th>
          <th>Inicio</th>
          <th>Estado</th>
          <th class="data-table__cell--numeric">Costo total</th>
        </tr>
      </thead>
      <tbody class="data-table__body" id="recent-batches-body">
        <tr class="data-table__row--clickable">
          <td class="data-table__cell--mono">LOT-20260619-001</td>
          <td class="data-table__cell--primary">SRV-NAT-200U</td>
          <td><span class="family-chip family-chip--servilletas">Servilletas</span></td>
          <td>L1</td>
          <td class="text-muted text-sm">19/06/2026 06:00</td>
          <td><span class="badge badge--active">Activo</span></td>
          <td class="data-table__cell--numeric font-semibold">$42.800</td>
        </tr>
        <tr class="data-table__row--clickable">
          <td class="data-table__cell--mono">LOT-20260618-007</td>
          <td class="data-table__cell--primary">BOL-KRAFT-500</td>
          <td><span class="family-chip family-chip--bolsitas">Bolsitas</span></td>
          <td>L2</td>
          <td class="text-muted text-sm">18/06/2026 14:30</td>
          <td><span class="badge badge--in-progress">En proceso</span></td>
          <td class="data-table__cell--numeric font-semibold">$31.200</td>
        </tr>
        <tr class="data-table__row--clickable">
          <td class="data-table__cell--mono">LOT-20260618-003</td>
          <td class="data-table__cell--primary">TRQ-CIRCU-100</td>
          <td><span class="family-chip family-chip--troquelados">Troquelados</span></td>
          <td>L3</td>
          <td class="text-muted text-sm">18/06/2026 08:00</td>
          <td><span class="badge badge--alert">Alerta</span></td>
          <td class="data-table__cell--numeric font-semibold">$18.950</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Load Chart.js from CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script src="../assets/js/dashboard.js"></script>

<?php include '../partials/footer.php'; ?>
