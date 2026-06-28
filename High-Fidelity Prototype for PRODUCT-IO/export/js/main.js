/**
 * PRODUCT-IO — Shared Application Logic (main.js)
 * Handles: sidebar toggle, active nav state, toast notifications,
 * user session display, collapsible sections.
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     Sidebar Toggle
  -------------------------------------------------- */
  function initSidebar() {
    var sidebar  = document.querySelector('.sidebar');
    var menuBtn  = document.querySelector('.header__menu-btn');
    var overlay  = document.querySelector('.sidebar-overlay');

    if (!sidebar || !menuBtn) return;

    menuBtn.addEventListener('click', function () {
      var isMobile = window.innerWidth <= 768;

      if (isMobile) {
        sidebar.classList.toggle('sidebar--mobile-open');
        if (overlay) overlay.classList.toggle('sidebar-overlay--visible');
      } else {
        sidebar.classList.toggle('sidebar--collapsed');
        var main = document.querySelector('.app__main');
        if (main) main.style.marginLeft = sidebar.classList.contains('sidebar--collapsed') ? '0' : '';
        var header = document.querySelector('.header');
        if (header) header.style.left = sidebar.classList.contains('sidebar--collapsed') ? '0' : '';
      }
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('sidebar--mobile-open');
        overlay.classList.remove('sidebar-overlay--visible');
      });
    }
  }

  /* --------------------------------------------------
     Active Navigation State
  -------------------------------------------------- */
  function initActiveNav() {
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var navItems = document.querySelectorAll('.sidebar__nav-item');

    navItems.forEach(function (item) {
      var href = item.getAttribute('href') || '';
      var hrefFile = href.split('/').pop();
      if (hrefFile === currentFile) {
        item.classList.add('sidebar__nav-item--active');
      }
    });
  }

  /* --------------------------------------------------
     User Session Display
  -------------------------------------------------- */
  var ROLE_LABELS = {
    operator:    'Operario de Línea',
    quality:     'Enc. Calidad',
    maintenance: 'Enc. Mantenimiento',
    accountant:  'Contador / Analista',
    manager:     'Gerente de Producción',
    admin:       'Administrador'
  };

  function initUserSession() {
    var user = JSON.parse(localStorage.getItem('productio_user') || 'null');
    if (!user) { user = { name: 'Admin Sistema', role: 'admin' }; }

    var initials  = user.name.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
    var roleLabel = ROLE_LABELS[user.role] || user.role;

    var nameEl   = document.querySelector('.sidebar__user-name');
    var roleEl   = document.querySelector('.sidebar__user-role');
    var avatarEl = document.querySelector('.sidebar__user-avatar');
    var headerNameEl = document.querySelector('.header__user-name');

    if (nameEl)      nameEl.textContent      = user.name;
    if (roleEl)      roleEl.textContent      = roleLabel;
    if (avatarEl)    avatarEl.textContent    = initials;
    if (headerNameEl) headerNameEl.textContent = user.name;
  }

  /* --------------------------------------------------
     Toast Notifications
     window.showToast('Mensaje', 'success' | 'danger')
  -------------------------------------------------- */
  var toastTimeout;
  window.showToast = function (message, type) {
    var toast = document.querySelector('.toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className   = 'toast' + (type ? ' toast--' + type : '');
    toast.classList.add('toast--show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('toast--show');
    }, 3000);
  };

  /* --------------------------------------------------
     Collapsible Sections
  -------------------------------------------------- */
  function initCollapsibles() {
    document.querySelectorAll('.collapsible__trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var body = document.getElementById(trigger.dataset.target);
        if (!body) return;
        var isOpen = body.classList.contains('collapsible__body--open');
        body.classList.toggle('collapsible__body--open', !isOpen);
        trigger.classList.toggle('collapsible__trigger--open', !isOpen);
      });
    });
  }

  /* --------------------------------------------------
     Logout
  -------------------------------------------------- */
  function initLogout() {
    var btn = document.querySelector('[data-action="logout"]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      localStorage.removeItem('productio_user');
      window.location.href = 'index.html';
    });
  }

  /* --------------------------------------------------
     Init
  -------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initSidebar();
    initActiveNav();
    initUserSession();
    initCollapsibles();
    initLogout();
  });

}());
