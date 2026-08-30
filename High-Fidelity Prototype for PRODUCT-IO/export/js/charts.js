/**
 * PRODUCT-IO — Chart Initializations (charts.js)
 * Requires Chart.js loaded via CDN before this file.
 * Call window.initCharts() after DOM ready on pages that need charts.
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     Shared chart defaults
  -------------------------------------------------- */
  var COLORS = {
    primary:   '#1E3A5F',
    secondary: '#2E86AB',
    accent:    '#F4A261',
    success:   '#2A9D8F',
    danger:    '#E63946',
    families: ['#667EEA', '#ED8936', '#38A169', '#E53E3E', '#0BC5EA']
  };

  function applyDefaults() {
    if (typeof Chart === 'undefined') return;
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

  /* --------------------------------------------------
     Dashboard: Bar chart — Production by line
  -------------------------------------------------- */
  function initDashboardBarChart() {
    var canvas = document.getElementById('chart-production-lines');
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['L1 Servilletas', 'L2 Bolsitas', 'L3 Troquelados', 'L4 Pajitas', 'L5 Vasos'],
        datasets: [
          {
            label: 'Unidades producidas',
            data: [42000, 35800, 28500, 19200, 31600],
            backgroundColor: COLORS.secondary,
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Costo total (ARS)',
            data: [185000, 142000, 98000, 67000, 125000],
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
            ticks: { callback: function (v) { return (v / 1000) + 'K'; } }
          },
          y2: {
            position: 'right',
            grid: { display: false },
            ticks: { callback: function (v) { return '$' + (v / 1000) + 'K'; } }
          }
        },
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }

  /* --------------------------------------------------
     Reports: Line chart — Weekly cost evolution
  -------------------------------------------------- */
  function initReportsCostChart() {
    var canvas = document.getElementById('chart-cost-evolution');
    if (!canvas) return;

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
        datasets: [
          {
            label: 'Costo Total (ARS)',
            data: [320000, 285000, 415000, 390000, 472000, 358000, 510000, 445000],
            borderColor: COLORS.secondary,
            backgroundColor: 'rgba(46,134,171,0.08)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: COLORS.secondary,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Costo Promedio/unidad',
            data: [7.2, 6.8, 8.1, 7.9, 8.5, 7.4, 9.1, 8.3],
            borderColor: COLORS.accent,
            backgroundColor: 'transparent',
            tension: 0.4,
            pointBackgroundColor: COLORS.accent,
            pointRadius: 4,
            pointHoverRadius: 6,
            yAxisID: 'y2',
            borderDash: [5, 5]
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
            ticks: { callback: function (v) { return '$' + (v / 1000) + 'K'; } }
          },
          y2: {
            position: 'right',
            grid: { display: false },
            ticks: { callback: function (v) { return '$' + v; } }
          }
        },
        plugins: { legend: { position: 'top' } }
      }
    });
  }

  /* --------------------------------------------------
     Reports: Doughnut chart — Cost by product family
  -------------------------------------------------- */
  function initReportsPieChart() {
    var canvas = document.getElementById('chart-family-distribution');
    if (!canvas) return;

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Servilletas', 'Bolsitas', 'Troquelados', 'Pajitas', 'Vasos'],
        datasets: [{
          data: [34, 22, 18, 12, 14],
          backgroundColor: COLORS.families,
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { position: 'right' },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ' ' + ctx.label + ': ' + ctx.parsed + '%';
              }
            }
          }
        }
      }
    });
  }

  /* --------------------------------------------------
     Public init — called by each page
  -------------------------------------------------- */
  window.initDashboardCharts = function () {
    applyDefaults();
    initDashboardBarChart();
  };

  window.initReportsCharts = function () {
    applyDefaults();
    initReportsCostChart();
    initReportsPieChart();
  };

}());
