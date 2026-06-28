<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
include '../partials/sidebar.php';
?>

<!-- Page header -->
<div class="page-header">
  <div class="page-header__titles">
    <h1 class="page-header__title">Gestión de Clientes</h1>
    <p class="page-header__subtitle">Catálogo de clientes de la fábrica actual</p>
  </div>
  <div class="page-header__actions">
    <button id="btn-nuevo-cliente" class="btn btn--primary">+ Nuevo Cliente</button>
  </div>
</div>

<!-- Tabla de Clientes -->
<div class="card section-gap">
  <div class="table-wrapper" style="border:none;box-shadow:none;border-radius:0">
    <table class="data-table" id="tabla-clientes">
      <thead class="data-table__head">
        <tr>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Email</th>
          <th style="width: 180px; text-align: center;">Acciones</th>
        </tr>
      </thead>
      <tbody class="data-table__body" id="lista-clientes">
        <tr>
          <td colspan="4" style="text-align: center; color: var(--color-text-muted); padding: var(--space-6);">Cargando clientes...</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Modal para Crear/Editar Cliente -->
<div class="modal" id="modal-cliente">
    <div class="modal__overlay" id="btn-overlay-close"></div>
    <div class="modal__dialog">
        <div class="modal__header">
            <h2 class="modal__title" id="modal-title">Nuevo Cliente</h2>
            <button type="button" class="modal__close" id="btn-close-modal" aria-label="Cerrar modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <form id="form-cliente">
            <div class="modal__body">
                <input type="hidden" id="cliente-id" name="id">
                
                <div class="form-field" style="margin-bottom: var(--space-4);">
                    <label class="form-field__label form-field__label--required" for="cliente-nombre">
                        Nombre de la Empresa
                    </label>
                    <input type="text" id="cliente-nombre" name="nombre" class="form-field__input" required placeholder="Ej. Distribuidora Gastronómica">
                </div>
                
                <div class="form-field" style="margin-bottom: var(--space-4);">
                    <label class="form-field__label" for="cliente-contacto">
                        Nombre de Contacto
                    </label>
                    <input type="text" id="cliente-contacto" name="contacto" class="form-field__input" placeholder="Ej. Juan Pérez">
                </div>
                
                <div class="form-field">
                    <label class="form-field__label" for="cliente-email">
                        Correo Electrónico
                    </label>
                    <input type="email" id="cliente-email" name="email" class="form-field__input" placeholder="Ej. juan@empresa.com">
                </div>
            </div>
            <div class="modal__footer">
                <button type="button" id="btn-cancelar" class="btn btn--secondary">Cancelar</button>
                <button type="submit" class="btn btn--primary">Guardar</button>
            </div>
        </form>
    </div>
</div>

<script src="../assets/js/clientes.js"></script>

<?php include '../partials/footer.php'; ?>
