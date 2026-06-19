/**
 * assets/js/clientes.js
 * Controlador para el módulo de Gestión de Clientes en ProductIO
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Marcar como activa la sección de Clientes en el Sidebar
    const navClientes = document.getElementById('nav-clientes');
    if (navClientes) {
        navClientes.classList.add('active');
    }

    // 2. Cargar listado inicial
    cargarClientes();

    // 3. Configurar eventos de la interfaz
    const btnNuevo = document.getElementById('btn-nuevo-cliente');
    const modal = document.getElementById('modal-cliente');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelar = document.getElementById('btn-cancelar');
    const formCliente = document.getElementById('form-cliente');

    btnNuevo.addEventListener('click', () => abrirModal());
    btnCloseModal.addEventListener('click', cerrarModal);
    btnCancelar.addEventListener('click', cerrarModal);
    formCliente.addEventListener('submit', guardarCliente);
});

// Almacén temporal en memoria para edición rápida
let clientesData = [];

function cargarClientes() {
    const listBody = document.getElementById('lista-clientes');
    listBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Cargando clientes...</td></tr>`;

    fetch('../api/clientes/listar.php')
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                clientesData = res.data;
                renderizarClientes(clientesData);
            } else {
                window.ms.mostrarError(res.error || 'Error al listar clientes.');
                listBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--danger);">${res.error || 'Error al listar clientes.'}</td></tr>`;
            }
        })
        .catch(err => {
            console.error('Error de red:', err);
            window.ms.mostrarError('Error de red al conectar con el servidor.');
            listBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--danger);">Error de conexión de red.</td></tr>`;
        });
}

function renderizarClientes(clientes) {
    const listBody = document.getElementById('lista-clientes');
    listBody.innerHTML = '';

    if (clientes.length === 0) {
        listBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">No hay clientes registrados en esta fábrica.</td></tr>`;
        return;
    }

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 500;">${escapeHTML(cliente.nombre)}</td>
            <td>${cliente.contacto ? escapeHTML(cliente.contacto) : '<em class="text-muted">No asignado</em>'}</td>
            <td>${cliente.email ? escapeHTML(cliente.email) : '<em class="text-muted">No asignado</em>'}</td>
            <td class="actions-cell" style="justify-content: center;">
                <button class="btn btn-secondary btn-sm" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        listBody.appendChild(tr);
    });
}

function abrirModal(cliente = null) {
    const modal = document.getElementById('modal-cliente');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('form-cliente');
    
    form.reset();

    if (cliente) {
        title.textContent = 'Editar Cliente';
        document.getElementById('cliente-id').value = cliente.id;
        document.getElementById('cliente-nombre').value = cliente.nombre;
        document.getElementById('cliente-contacto').value = cliente.contacto || '';
        document.getElementById('cliente-email').value = cliente.email || '';
    } else {
        title.textContent = 'Nuevo Cliente';
        document.getElementById('cliente-id').value = '';
    }

    modal.classList.add('open');
}

function cerrarModal() {
    const modal = document.getElementById('modal-cliente');
    modal.classList.remove('open');
}

function guardarCliente(e) {
    e.preventDefault();

    const id = document.getElementById('cliente-id').value;
    const nombre = document.getElementById('cliente-nombre').value.trim();
    const contacto = document.getElementById('cliente-contacto').value.trim();
    const email = document.getElementById('cliente-email').value.trim();

    if (!nombre) {
        window.ms.mostrarError('El nombre del cliente es obligatorio.');
        return;
    }

    const payload = { id, nombre, contacto, email };

    fetch('../api/clientes/guardar.php', {
        method: 'POST',
        headers: { 'Content-Type: application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(res => {
        if (res.success) {
            window.ms.mostrarExito(res.message || 'Operación realizada con éxito.');
            cerrarModal();
            cargarClientes();
        } else {
            window.ms.mostrarError(res.error || 'Error al guardar el cliente.');
        }
    })
    .catch(err => {
        console.error('Error al guardar:', err);
        window.ms.mostrarError('Error de red al guardar cliente.');
    });
}

function editarCliente(id) {
    const cliente = clientesData.find(c => c.id == id);
    if (cliente) {
        abrirModal(cliente);
    }
}

function eliminarCliente(id) {
    const cliente = clientesData.find(c => c.id == id);
    if (!cliente) return;

    if (confirm(`¿Estás seguro de eliminar al cliente "${cliente.nombre}"?`)) {
        fetch('../api/clientes/eliminar.php', {
            method: 'POST',
            headers: { 'Content-Type: application/json' },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                window.ms.mostrarExito(res.message || 'Cliente eliminado con éxito.');
                cargarClientes();
            } else {
                window.ms.mostrarError(res.error || 'Error al eliminar cliente.');
            }
        })
        .catch(err => {
            console.error('Error al eliminar:', err);
            window.ms.mostrarError('Error de red al intentar eliminar el cliente.');
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
