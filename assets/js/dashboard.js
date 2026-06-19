/**
 * assets/js/dashboard.js
 * Controlador para la interfaz principal (Dashboard) de ProductIO
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Marcar como activa la sección del Dashboard en el Sidebar
    const navDashboard = document.getElementById('nav-dashboard');
    if (navDashboard) {
        navDashboard.classList.add('active');
    }

    // 2. Cargar los datos del Dashboard desde el Backend
    cargarDatosDashboard();
});

function cargarDatosDashboard() {
    fetch('../api/dashboard/obtener_resumen.php')
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                const data = res.data;
                actualizarUI(data);
            } else {
                window.ms.mostrarError(res.error || 'Error al cargar resumen del dashboard');
                document.getElementById('welcome-message').textContent = 'Error al cargar el contexto de la fábrica.';
            }
        })
        .catch(err => {
            console.error('Error de red:', err);
            window.ms.mostrarError('Error de red al conectar con el servidor.');
            document.getElementById('welcome-message').textContent = 'Error crítico de conexión.';
        });
}

function actualizarUI(data) {
    // Bienvenido
    document.getElementById('welcome-message').textContent = `Estás gestionando el entorno operativo de ${data.nombre_fabrica}.`;

    // Lotes Activos
    document.getElementById('val-lotes-activos').textContent = data.lotes_activos;
    const footerLotes = document.getElementById('footer-lotes-activos');
    const varLotes = data.lotes_activos_var.startsWith('+') ? 'trend-up' : 'trend-down';
    footerLotes.innerHTML = `<span class="${varLotes}">${data.lotes_activos_var}</span> <span class="text-muted">vs. mes anterior</span>`;

    // Costo Promedio
    document.getElementById('val-costo-promedio').textContent = formatearMoneda(data.costo_promedio);
    const footerCosto = document.getElementById('footer-costo-promedio');
    const varCosto = data.costo_promedio_var.startsWith('-') ? 'trend-up' : 'trend-down'; // en costos, negativo es positivo
    footerCosto.innerHTML = `<span class="${varCosto}">${data.costo_promedio_var}</span> <span class="text-muted">variación reciente</span>`;

    // Eficiencia
    document.getElementById('val-eficiencia').textContent = `${data.eficiencia}%`;
    const footerEficiencia = document.getElementById('footer-eficiencia');
    const varEficiencia = data.eficiencia_var.startsWith('+') ? 'trend-up' : 'trend-down';
    footerEficiencia.innerHTML = `<span class="${varEficiencia}">${data.eficiencia_var}</span> <span class="text-muted">vs. estándar teórico</span>`;

    // Alertas
    document.getElementById('val-alertas').textContent = data.alertas;

    // Resumen Datos Maestros
    document.getElementById('val-cant-clientes').textContent = data.cant_clientes;
    document.getElementById('val-cant-productos').textContent = data.cant_productos;

    // Renderizar Gráfico de Rendimiento por Línea
    renderizarGrafico(data.rendimiento_lineas);
}

function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
}

function renderizarGrafico(lineas) {
    const container = document.getElementById('rendimiento-chart');
    if (!container) return;

    container.innerHTML = '';

    // Encontrar el valor máximo para calcular alturas porcentuales
    const maxVal = Math.max(...lineas.map(l => l.valor), 1);

    lineas.forEach(linea => {
        const percentage = (linea.valor / maxVal) * 85; // Max 85% de altura para dejar espacio al label superior

        const wrapper = document.createElement('div');
        wrapper.className = 'chart-bar-wrapper';

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = '0%'; // Inicia en 0 para animación
        bar.setAttribute('data-value', linea.valor.toLocaleString('es-AR') + ' un.');
        
        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = linea.linea;

        wrapper.appendChild(bar);
        wrapper.appendChild(label);
        container.appendChild(wrapper);

        // Disparar la animación de carga de barra
        setTimeout(() => {
            bar.style.height = `${percentage}%`;
        }, 100);
    });
}
