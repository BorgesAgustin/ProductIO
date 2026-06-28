/**
 * assets/js/productos.js
 * Controlador para el módulo de Gestión de Productos (Catálogo SKU) en ProductIO
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Marcar como activa la sección de Productos en el Sidebar
    const navProductos = document.getElementById('nav-productos');
    if (navProductos) {
        navProductos.classList.add('active');
    }

    // 2. Cargar catálogo inicial
    cargarProductos();

    // 3. Configurar eventos de la interfaz
    const btnNuevo = document.getElementById('btn-nuevo-producto');
    const modal = document.getElementById('modal-producto');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnOverlayClose = document.getElementById('btn-overlay-close');
    const btnCancelar = document.getElementById('btn-cancelar');
    const formProducto = document.getElementById('form-producto');

    btnNuevo.addEventListener('click', () => abrirModal());
    if (btnCloseModal) btnCloseModal.addEventListener('click', cerrarModal);
    if (btnOverlayClose) btnOverlayClose.addEventListener('click', cerrarModal);
    if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);
    formProducto.addEventListener('submit', guardarProducto);
});

// Almacén temporal en memoria para operaciones ágiles
let productosData = [];

function cargarProductos() {
    const listBody = document.getElementById('lista-productos');
    listBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: var(--space-6);">Cargando catálogo...</td></tr>`;

    fetch('../api/productos/listar.php')
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                productosData = res.data;
                renderizarProductos(productosData);
            } else {
                window.ms.mostrarError(res.error || 'Error al cargar el catálogo de productos.');
                listBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-danger); padding: var(--space-6);">${res.error || 'Error al cargar catálogo.'}</td></tr>`;
            }
        })
        .catch(err => {
            console.error('Error de red:', err);
            window.ms.mostrarError('Error de red al conectar con el servidor.');
            listBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-danger); padding: var(--space-6);">Error de conexión de red.</td></tr>`;
        });
}

function renderizarProductos(productos) {
    const listBody = document.getElementById('lista-productos');
    listBody.innerHTML = '';

    if (productos.length === 0) {
        listBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: var(--space-8);">No hay productos registrados en el catálogo de esta fábrica.</td></tr>`;
        return;
    }

    productos.forEach(producto => {
        const tr = document.createElement('tr');
        const badgeClass = producto.estado == 1 ? 'badge--enabled' : 'badge--disabled';
        const badgeLabel = producto.estado == 1 ? 'Activo' : 'Inactivo';
        
        // Determinar clase del chip de familia
        const familiaLower = producto.familia.toLowerCase();
        const familyChipClass = `family-chip--${familiaLower}`;

        tr.innerHTML = `
            <td class="data-table__cell--mono">${escapeHTML(producto.sku)}</td>
            <td class="data-table__cell--primary">${escapeHTML(producto.nombre)}</td>
            <td><span class="family-chip ${familyChipClass}">${escapeHTML(producto.familia)}</span></td>
            <td>${producto.gramaje ? parseFloat(producto.gramaje).toLocaleString('es-AR') + ' g' : '<em class="text-muted">-</em>'}</td>
            <td>${producto.color ? escapeHTML(producto.color) : '<em class="text-muted">-</em>'}</td>
            <td><span class="badge ${badgeClass}">${badgeLabel}</span></td>
            <td class="data-table__cell--actions" style="justify-content: center;">
                <button class="btn btn--secondary btn--sm" onclick="editarProducto(${producto.id})">Editar</button>
                <button class="btn btn--danger btn--sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        listBody.appendChild(tr);
    });
}

function abrirModal(producto = null) {
    const modal = document.getElementById('modal-producto');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('form-producto');
    
    form.reset();

    if (producto) {
        title.textContent = 'Editar Producto';
        document.getElementById('producto-id').value = producto.id;
        document.getElementById('producto-sku').value = producto.sku;
        document.getElementById('producto-nombre').value = producto.nombre;
        document.getElementById('producto-familia').value = producto.familia;
        document.getElementById('producto-gramaje').value = producto.gramaje !== null ? producto.gramaje : '';
        document.getElementById('producto-color').value = producto.color || '';
        document.getElementById('producto-descripcion').value = producto.descripcion || '';
        document.getElementById('producto-estado').value = producto.estado;
    } else {
        title.textContent = 'Nuevo Producto';
        document.getElementById('producto-id').value = '';
    }

    modal.classList.add('modal--open');
}

function cerrarModal() {
    const modal = document.getElementById('modal-producto');
    modal.classList.remove('modal--open');
}

function guardarProducto(e) {
    e.preventDefault();

    const id = document.getElementById('producto-id').value;
    const sku = document.getElementById('producto-sku').value.trim();
    const nombre = document.getElementById('producto-nombre').value.trim();
    const familia = document.getElementById('producto-familia').value;
    const gramaje = document.getElementById('producto-gramaje').value;
    const color = document.getElementById('producto-color').value.trim();
    const descripcion = document.getElementById('producto-descripcion').value.trim();
    const estado = document.getElementById('producto-estado').value;

    if (!sku || !nombre || !familia) {
        window.ms.mostrarError('Complete todos los campos obligatorios (*).');
        return;
    }

    const payload = { id, sku, nombre, familia, gramaje, color, descripcion, estado };

    fetch('../api/productos/guardar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(res => {
        if (res.success) {
            window.ms.mostrarExito(res.message || 'Producto guardado con éxito.');
            cerrarModal();
            cargarProductos();
        } else {
            window.ms.mostrarError(res.error || 'Error al guardar el producto.');
        }
    })
    .catch(err => {
        console.error('Error al guardar:', err);
        window.ms.mostrarError('Error de red al guardar producto.');
    });
}

function editarProducto(id) {
    const producto = productosData.find(p => p.id == id);
    if (producto) {
        abrirModal(producto);
    }
}

function eliminarProducto(id) {
    const producto = productosData.find(p => p.id == id);
    if (!producto) return;

    if (confirm(`¿Estás seguro de eliminar el producto "${producto.nombre}" (${producto.sku})?`)) {
        fetch('../api/productos/eliminar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                window.ms.mostrarExito(res.message || 'Producto eliminado con éxito.');
                cargarProductos();
            } else {
                window.ms.mostrarError(res.error || 'Error al eliminar el producto.');
            }
        })
        .catch(err => {
            console.error('Error al eliminar:', err);
            window.ms.mostrarError('Error de red al intentar eliminar el producto.');
        });
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
