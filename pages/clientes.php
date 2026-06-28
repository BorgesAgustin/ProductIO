<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
include '../partials/sidebar.php';
?>

<div class="clientes-content" style="width: 100%;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
            <h1 style="font-family: 'Outfit', sans-serif;">Gestión de Clientes</h1>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Catálogo de clientes de la fábrica actual</p>
        </div>
        <button id="btn-nuevo-cliente" class="btn btn-primary" style="width: auto;">+ Nuevo Cliente</button>
    </div>

    <!-- Tabla de Clientes -->
    <div class="card">
        <div class="data-table-container">
            <table class="data-table" id="tabla-clientes">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Email</th>
                        <th style="width: 150px; text-align: center;">Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-clientes">
                    <tr>
                        <td colspan="4" style="text-align: center; color: var(--text-muted);">Cargando clientes...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal para Crear/Editar Cliente -->
<div class="modal" id="modal-cliente">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modal-title" style="font-family: 'Outfit', sans-serif;">Nuevo Cliente</h3>
            <span class="modal-close" id="btn-close-modal">&times;</span>
        </div>
        <form id="form-cliente">
            <input type="hidden" id="cliente-id" name="id">
            <div class="form-group">
                <label for="cliente-nombre">Nombre de la Empresa *</label>
                <input type="text" id="cliente-nombre" name="nombre" required placeholder="Ej. Distribuidora Gastronómica">
            </div>
            <div class="form-group">
                <label for="cliente-contacto">Nombre de Contacto</label>
                <input type="text" id="cliente-contacto" name="contacto" placeholder="Ej. Juan Pérez">
            </div>
            <div class="form-group">
                <label for="cliente-email">Correo Electrónico</label>
                <input type="email" id="cliente-email" name="email" placeholder="Ej. juan@empresa.com">
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="button" id="btn-cancelar" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</div>

<script src="../assets/js/clientes.js"></script>

<?php include '../partials/footer.php'; ?>
