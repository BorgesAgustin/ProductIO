/**
 * assets/js/onboarding.js
 */

document.addEventListener('DOMContentLoaded', function() {
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
                grid.innerHTML = `<p class="error">${res.error}</p>`;
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
        grid.innerHTML = '<p>No tienes fábricas asignadas. Contacta al administrador.</p>';
        return;
    }

    fabricas.forEach(f => {
        const card = document.createElement('div');
        card.className = 'fabrica-card';
        card.innerHTML = `
            <h3>${f.nombre}</h3>
            <p>${f.direccion || 'Sin dirección'}</p>
        `;
        card.onclick = () => seleccionarFabrica(f.id);
        grid.appendChild(card);
    });
}

function seleccionarFabrica(id) {
    fetch('../api/fabricas/seleccionar.php', {
        method: 'POST',
        body: new URLSearchParams({ id: id })
    })
    .then(r => r.json())
    .then(res => {
        if (res.success) {
            window.location.href = 'dashboard.html';
        } else {
            window.ms.mostrarError(res.error);
        }
    });
}
