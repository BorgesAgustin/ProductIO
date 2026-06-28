<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
include '../partials/sidebar.php';
?>

<!-- Page header -->
<div class="page-header">
  <div class="page-header__titles">
    <h1 class="page-header__title">Gestión de Productos</h1>
    <p class="page-header__subtitle">Catálogo de productos (SKU) de la fábrica actual</p>
  </div>
  <div class="page-header__actions">
    <button id="btn-nuevo-producto" class="btn btn--primary">+ Nuevo Producto</button>
  </div>
</div>

<!-- Tabla de Productos -->
<div class="card section-gap">
  <div class="table-wrapper table-wrapper--flat">
    <table class="data-table" id="tabla-productos">
      <thead class="data-table__head">
        <tr>
          <th>SKU</th>
          <th>Nombre</th>
          <th>Familia</th>
          <th>Gramaje (g)</th>
          <th>Color</th>
          <th>Estado</th>
          <th class="col--actions">Acciones</th>
        </tr>
      </thead>
      <tbody class="data-table__body" id="lista-productos">
        <tr>
          <td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: var(--space-6);">Cargando catálogo...</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Modal para Crear/Editar Producto -->
<div class="modal" id="modal-producto">
    <div class="modal__overlay" id="btn-overlay-close"></div>
    <div class="modal__dialog" style="max-width: 600px;">
        <div class="modal__header">
            <h2 class="modal__title" id="modal-title">Nuevo Producto</h2>
            <button type="button" class="modal__close" id="btn-close-modal" aria-label="Cerrar modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <form id="form-producto">
            <div class="modal__body">
                <input type="hidden" id="producto-id" name="id">
                
                <div class="grid grid--2" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
                    <div class="form-field">
                        <label class="form-field__label form-field__label--required" for="producto-sku">
                            Código SKU
                        </label>
                        <input type="text" id="producto-sku" name="sku" class="form-field__input" required placeholder="Ej. SERV-33-DH">
                    </div>
                    <div class="form-field">
                        <label class="form-field__label form-field__label--required" for="producto-familia">
                            Familia
                        </label>
                        <select id="producto-familia" name="familia" class="form-field__input" required style="width: 100%; height: 42px; background-color: var(--color-surface);">
                            <option value="">Seleccione una familia...</option>
                            <option value="SERVILLETAS">SERVILLETAS</option>
                            <option value="BOLSITAS">BOLSITAS</option>
                            <option value="TROQUELADOS">TROQUELADOS</option>
                            <option value="PAJITAS">PAJITAS</option>
                            <option value="VASOS">VASOS</option>
                        </select>
                    </div>
                </div>

                <div class="form-field" style="margin-bottom: var(--space-4);">
                    <label class="form-field__label form-field__label--required" for="producto-nombre">
                        Nombre del Producto
                    </label>
                    <input type="text" id="producto-nombre" name="nombre" class="form-field__input" required placeholder="Ej. Servilleta Doble Hoja 33x33">
                </div>

                <div class="grid grid--2" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
                    <div class="form-field">
                        <label class="form-field__label" for="producto-gramaje">
                            Gramaje (g)
                        </label>
                        <input type="number" id="producto-gramaje" name="gramaje" class="form-field__input" step="0.01" min="0" placeholder="Ej. 18.5">
                    </div>
                    <div class="form-field">
                        <label class="form-field__label" for="producto-color">
                            Color
                        </label>
                        <input type="text" id="producto-color" name="color" class="form-field__input" placeholder="Ej. Blanco, Marrón, Impreso">
                    </div>
                </div>

                <div class="form-field" style="margin-bottom: var(--space-4);">
                    <label class="form-field__label" for="producto-descripcion">
                        Descripción
                    </label>
                    <textarea id="producto-descripcion" name="descripcion" class="form-field__input" placeholder="Detalles o especificaciones adicionales del producto..." style="min-height: 80px; font-family: inherit; resize: vertical; padding: var(--space-3);"></textarea>
                </div>

                <div class="form-field">
                    <label class="form-field__label" for="producto-estado">
                        Estado
                    </label>
                    <select id="producto-estado" name="estado" class="form-field__input" style="width: 100%; height: 42px; background-color: var(--color-surface);">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>
            </div>
            <div class="modal__footer">
                <button type="button" id="btn-cancelar" class="btn btn--secondary">Cancelar</button>
                <button type="submit" class="btn btn--primary">Guardar</button>
            </div>
        </form>
    </div>
</div>

<script src="../assets/js/productos.js"></script>

<?php include '../partials/footer.php'; ?>
