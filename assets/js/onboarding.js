/**
 * assets/js/onboarding.js
 */

document.addEventListener('DOMContentLoaded', function () {
    cargarFabricas();
});

function cargarFabricas() {
    const grid = document.getElementById('fabricas-grid');

    fetch('../api/fabricas/listar_usuario.php')
        .then(r => r.json())
        .then(res => {
            if (res.success) {
                renderFabricas(res.data);
            } else {
                window.ms.mostrarError(res.error || 'Error al cargar fábricas');
                grid.innerHTML = `<p class="fabricas-grid__error">${res.error}</p>`;
            }
        })
        .catch(err => {
            window.ms.mostrarError('Error de red');
        });
}

function renderFabricas(fabricas) {
    const grid = document.getElementById('fabricas-grid');
    grid.innerHTML = '';

    if (fabricas.length === 0) {
        grid.innerHTML = '<p class="fabricas-grid__empty">No tienes fábricas asignadas. Contacta al administrador.</p>';
        return;
    }

    fabricas.forEach(f => {
        const card = document.createElement('div');
        card.className = 'fabrica-card';
        card.innerHTML = `
            <div class="fabrica-card__name">${f.nombre}</div>
            <div class="fabrica-card__address">${f.direccion || 'Sin dirección'}</div>
            <div class="fabrica-card__footer">${renderRoleBadge(f.rol)}</div>
        `;
        card.onclick = () => seleccionarFabrica(f.id);
        grid.appendChild(card);
    });
}

// Misma regla que partials/sidebar.php: solo 'admin' tiene la etiqueta de Administrador.
function renderRoleBadge(rol) {
    const esAdmin = rol === 'admin';
    const clase = esAdmin ? 'role-badge--admin' : 'role-badge--operator';
    const etiqueta = esAdmin ? 'Administrador' : 'Operario de Línea';
    return `<span class="role-badge ${clase}">${etiqueta}</span>`;
}

function seleccionarFabrica(id) {
    fetch('../api/fabricas/seleccionar.php', {
        method: 'POST',
        body: new URLSearchParams({ id: id })
    })
        .then(r => r.json())
        .then(res => {
            if (res.success) {
                window.location.href = 'dashboard.php';
            } else {
                window.ms.mostrarError(res.error);
            }
        });
}