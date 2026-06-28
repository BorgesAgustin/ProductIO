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
    const classLotes = data.lotes_activos_var.startsWith('+') ? 'kpi-card__trend--positive' : 'kpi-card__trend--negative';
    const iconLotes = data.lotes_activos_var.startsWith('+') ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;
    footerLotes.className = `kpi-card__trend ${classLotes}`;
    footerLotes.innerHTML = `${iconLotes} <span>${data.lotes_activos_var} vs mes ant.</span>`;

    // Costo Promedio
    document.getElementById('val-costo-promedio').textContent = formatearMoneda(data.costo_promedio);
    const footerCosto = document.getElementById('footer-costo-promedio');
    const varCosto = data.costo_promedio_var.startsWith('-') ? 'trend-up' : 'trend-down'; // en costos, negativo es positivo (baja costo)
    const classCosto = data.costo_promedio_var.startsWith('-') ? 'kpi-card__trend--positive' : 'kpi-card__trend--negative';
    const iconCosto = data.costo_promedio_var.startsWith('-') ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;
    footerCosto.className = `kpi-card__trend ${classCosto}`;
    footerCosto.innerHTML = `${iconCosto} <span>${data.costo_promedio_var} vs mes ant.</span>`;

    // Eficiencia
    document.getElementById('val-eficiencia').textContent = `${data.eficiencia}%`;
    const footerEficiencia = document.getElementById('footer-eficiencia');
    const varEficiencia = data.eficiencia_var.startsWith('+') ? 'trend-up' : 'trend-down';
    const classEficiencia = data.eficiencia_var.startsWith('+') ? 'kpi-card__trend--positive' : 'kpi-card__trend--negative';
    const iconEficiencia = data.eficiencia_var.startsWith('+') ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;
    footerEficiencia.className = `kpi-card__trend ${classEficiencia}`;
    footerEficiencia.innerHTML = `${iconEficiencia} <span>${data.eficiencia_var} este mes</span>`;

    // Alertas
    document.getElementById('val-alertas').textContent = data.alertas;

    // Resumen Datos Maestros
    document.getElementById('val-cant-clientes').textContent = data.cant_clientes;
    document.getElementById('val-cant-productos').textContent = data.cant_productos;

    // Renderizar Gráfico de Rendimiento por Línea (Chart.js)
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

let chartInstance = null;

function renderizarGrafico(lineas) {
    const canvas = document.getElementById('chart-production-lines');
    if (!canvas) return;

    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = lineas.map(l => l.linea);
    const unidades = lineas.map(l => l.valor);
    const costos = lineas.map(l => l.costo || 0);

    const COLORS = {
        primary:   '#1E3A5F',
        secondary: '#2E86AB',
        accent:    '#F4A261',
        success:   '#2A9D8F',
        danger:    '#E63946'
    };

    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family  = "'Inter', sans-serif";
        Chart.defaults.font.size    = 12;
        Chart.defaults.color        = '#718096';
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        Chart.defaults.plugins.legend.labels.padding = 16;
        Chart.defaults.plugins.tooltip.padding = 10;
        Chart.defaults.plugins.tooltip.cornerRadius = 8;
        Chart.defaults.plugins.tooltip.titleFont = { weight: '600' };
        Chart.defaults.animation.duration = 600;
        Chart.defaults.animation.easing   = 'easeInOutQuart';
    }

    chartInstance = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Unidades producidas',
                    data: unidades,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 6,
                    borderSkipped: false
                },
                {
                    label: 'Costo total (ARS)',
                    data: costos,
                    backgroundColor: COLORS.accent,
                    borderRadius: 6,
                    borderSkipped: false,
                    yAxisID: 'y2'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false } },
                y: {
                    grid: { color: '#EDF2F7' },
                    ticks: { callback: function (v) { return (v >= 1000 ? (v / 1000) + 'K' : v); } }
                },
                y2: {
                    position: 'right',
                    grid: { display: false },
                    ticks: { callback: function (v) { return '$' + (v >= 1000 ? (v / 1000) + 'K' : v); } }
                }
            },
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}
