<?php
require_once '../partials/auth_check.php';
include '../partials/header.php';
include '../partials/sidebar.php';
?>

<div class="productos-content" style="width: 100%;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
            <h1 style="font-family: 'Outfit', sans-serif;">Gestión de Productos</h1>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Catálogo de productos (SKU) de la fábrica actual</p>
        </div>
        <button id="btn-nuevo-producto" class="btn btn-primary" style="width: auto;">+ Nuevo Producto</button>
    </div>

    <!-- Tabla de Productos -->
    <div class="card">
        <div class="data-table-container">
            <table class="data-table" id="tabla-productos">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Nombre</th>
                        <th>Familia</th>
                        <th>Gramaje (g)</th>
                        <th>Color</th>
                        <th>Estado</th>
                        <th style="width: 150px; text-align: center;">Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-productos">
                    <tr>
                        <td colspan="7" style="text-align: center; color: var(--text-muted);">Cargando catálogo...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal para Crear/Editar Producto -->
<div class="modal" id="modal-producto">
    <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
            <h3 id="modal-title" style="font-family: 'Outfit', sans-serif;">Nuevo Producto</h3>
            <span class="modal-close" id="btn-close-modal">&times;</span>
        </div>
        <form id="form-producto">
            <input type="hidden" id="producto-id" name="id">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label for="producto-sku">Código SKU *</label>
                    <input type="text" id="producto-sku" name="sku" required placeholder="Ej. SERV-33-DH">
                </div>
                <div class="form-group">
                    <label for="producto-familia">Familia *</label>
                    <select id="producto-familia" name="familia" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border); border-radius: var(--radius); background-color: var(--surface);">
                        <option value="">Seleccione una familia...</option>
                        <option value="SERVILLETAS">SERVILLETAS</option>
                        <option value="BOLSITAS">BOLSITAS</option>
                        <option value="TROQUELADOS">TROQUELADOS</option>
                        <option value="PAJITAS">PAJITAS</option>
                        <option value="VASOS">VASOS</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="producto-nombre">Nombre del Producto *</label>
                <input type="text" id="producto-nombre" name="nombre" required placeholder="Ej. Servilleta Doble Hoja 33x33">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label for="producto-gramaje">Gramaje (g)</label>
                    <input type="number" id="producto-gramaje" name="gramaje" step="0.01" min="0" placeholder="Ej. 18.5">
                </div>
                <div class="form-group">
                    <label for="producto-color">Color</label>
                    <input type="text" id="producto-color" name="color" placeholder="Ej. Blanco, Marrón, Impreso">
                </div>
            </div>

            <div class="form-group">
                <label for="producto-descripcion">Descripción</label>
                <textarea id="producto-descripcion" name="descripcion" placeholder="Detalles o especificaciones adicionales del producto..." style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border); border-radius: var(--radius); min-height: 80px; font-family: inherit; resize: vertical;"></textarea>
            </div>

            <div class="form-group">
                <label for="producto-estado">Estado</label>
                <select id="producto-estado" name="estado" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border); border-radius: var(--radius); background-color: var(--surface);">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="button" id="btn-cancelar" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</div>

<script src="../assets/js/productos.js"></script>

<?php include '../partials/footer.php'; ?>
