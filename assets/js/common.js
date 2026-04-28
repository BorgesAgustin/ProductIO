/**
 * assets/js/common.js
 * Funcionalidad compartida para todo el sistema
 */

function mostrarNotificacion(mensaje, tipo = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

window.ms = {
    mostrarExito: (msg) => mostrarNotificacion(msg, 'success'),
    mostrarError: (msg) => mostrarNotificacion(msg, 'error'),
    mostrarInfo: (msg) => mostrarNotificacion(msg, 'info')
};
