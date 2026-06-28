/**
 * PRODUCT-IO — Admin Module Logic (admin.js)
 * Handles: user creation modal, user enable/disable, inline search.
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     Modal — Create User
  -------------------------------------------------- */
  function initCreateModal() {
    var openBtn  = document.getElementById('btn-new-user');
    var modal    = document.getElementById('modal-create-user');
    var closeBtn = document.getElementById('modal-close');
    var cancelBtn = document.getElementById('btn-cancel-user');
    var form     = document.getElementById('form-create-user');

    if (!openBtn || !modal) return;

    function openModal() {
      modal.classList.add('modal--open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('modal--open');
      document.body.style.overflow = '';
      if (form) form.reset();
    }

    openBtn.addEventListener('click', openModal);
    if (closeBtn)  closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    /* Close on overlay click */
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('modal__overlay')) closeModal();
    });

    /* Submit */
    var saveBtn = document.getElementById('btn-save-user');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var nameInput  = document.getElementById('user-name');
        var emailInput = document.getElementById('user-email');
        var roleInput  = document.getElementById('user-role');

        var valid = true;
        [nameInput, emailInput, roleInput].forEach(function (el) {
          if (!el) return;
          if (!el.value.trim()) {
            el.classList.add('form-field__input--error');
            valid = false;
          } else {
            el.classList.remove('form-field__input--error');
          }
        });

        if (!valid) {
          window.showToast && window.showToast('Complete todos los campos requeridos.', 'danger');
          return;
        }

        /* Simulate save */
        saveBtn.disabled = true;
        saveBtn.textContent = 'Guardando...';
        setTimeout(function () {
          closeModal();
          window.showToast && window.showToast('Usuario creado exitosamente.', 'success');
          saveBtn.disabled = false;
          saveBtn.textContent = 'Crear usuario';
        }, 900);
      });
    }
  }

  /* --------------------------------------------------
     Toggle User Status (enable / disable)
  -------------------------------------------------- */
  function initToggleStatus() {
    document.querySelectorAll('[data-action="toggle-status"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row    = btn.closest('tr');
        var badge  = row ? row.querySelector('.badge') : null;
        if (!badge) return;

        var isActive = badge.classList.contains('badge--enabled');
        badge.classList.toggle('badge--enabled',  !isActive);
        badge.classList.toggle('badge--disabled', isActive);
        badge.textContent = isActive ? 'Inactivo' : 'Activo';
        btn.textContent   = isActive ? 'Activar'  : 'Desactivar';

        window.showToast && window.showToast(
          isActive ? 'Usuario desactivado.' : 'Usuario activado.',
          isActive ? 'danger' : 'success'
        );
      });
    });
  }

  /* --------------------------------------------------
     Inline Table Search
  -------------------------------------------------- */
  function initSearch() {
    var searchInput = document.getElementById('search-users');
    var tbody       = document.querySelector('#users-table tbody');

    if (!searchInput || !tbody) return;

    searchInput.addEventListener('input', function () {
      var q = searchInput.value.toLowerCase().trim();
      Array.from(tbody.rows).forEach(function (row) {
        var text = row.textContent.toLowerCase();
        row.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
    });
  }

  /* --------------------------------------------------
     Init
  -------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initCreateModal();
    initToggleStatus();
    initSearch();
  });

}());
