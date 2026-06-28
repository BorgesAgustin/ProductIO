/**
 * assets/js/common.js
 * Funcionalidad compartida para todo el sistema
 */

function mostrarNotificacion(mensaje, tipo = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const toast = document.createElement('div');
    
    // Mapear el tipo a las clases BEM de styles.css
    let claseTipo = '';
    if (tipo === 'success') {
        claseTipo = 'toast--success';
    } else if (tipo === 'error' || tipo === 'danger') {
        claseTipo = 'toast--danger';
    }

    toast.className = `toast ${claseTipo}`;
    toast.textContent = mensaje;

    container.appendChild(toast);

    // Agregar la clase toast--show con un leve delay para activar la animación CSS
    setTimeout(() => {
        toast.classList.add('toast--show');
    }, 50);

    // Desvanecer y eliminar el toast
    setTimeout(() => {
        toast.classList.remove('toast--show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

window.ms = {
    mostrarExito: (msg) => mostrarNotificacion(msg, 'success'),
    mostrarError: (msg) => mostrarNotificacion(msg, 'error'),
    mostrarInfo: (msg) => mostrarNotificacion(msg, 'info')
};
