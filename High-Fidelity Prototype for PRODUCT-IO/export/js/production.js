/**
 * PRODUCT-IO — Production Module Logic (production.js)
 * Handles: multi-step form stepper, supplies management in close-batch.
 */

(function () {
  'use strict';

  /* --------------------------------------------------
     Multi-step Form (produccion-nuevo.html)
  -------------------------------------------------- */
  function initStepper() {
    var formEl     = document.getElementById('form-new-batch');
    var step1Panel = document.getElementById('step-panel-1');
    var step2Panel = document.getElementById('step-panel-2');
    var nextBtn    = document.getElementById('btn-next');
    var backBtn    = document.getElementById('btn-back');
    var submitBtn  = document.getElementById('btn-submit');

    if (!formEl || !step1Panel || !step2Panel) return;

    /* Step indicator elements */
    var stepCircle1 = document.getElementById('stepper-circle-1');
    var stepCircle2 = document.getElementById('stepper-circle-2');
    var stepLabel1  = document.getElementById('stepper-label-1');
    var stepLabel2  = document.getElementById('stepper-label-2');
    var stepLine    = document.getElementById('stepper-line');

    function goToStep2() {
      /* Basic validation */
      var line     = document.getElementById('input-line');
      var machine  = document.getElementById('input-machine');
      var product  = document.getElementById('input-product');

      var valid = true;
      [line, machine, product].forEach(function (el) {
        if (!el) return;
        if (!el.value) {
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

      /* Populate confirmation */
      populateConfirmation();

      /* Show step 2 */
      step1Panel.style.display = 'none';
      step2Panel.style.display = 'block';

      /* Update stepper UI */
      if (stepCircle1) { stepCircle1.classList.remove('stepper__step--active'); stepCircle1.classList.add('stepper__step--completed'); }
      if (stepCircle2) stepCircle2.classList.add('stepper__step--active');
      if (stepLabel1)  { stepLabel1.classList.remove('stepper__step--active'); stepLabel1.classList.add('stepper__step--completed'); }
      if (stepLabel2)  stepLabel2.classList.add('stepper__step--active');
      if (stepLine)    stepLine.classList.add('stepper__line--completed');
    }

    function goToStep1() {
      step1Panel.style.display = 'block';
      step2Panel.style.display = 'none';

      if (stepCircle1) { stepCircle1.classList.add('stepper__step--active'); stepCircle1.classList.remove('stepper__step--completed'); }
      if (stepCircle2) stepCircle2.classList.remove('stepper__step--active');
      if (stepLabel1)  { stepLabel1.classList.add('stepper__step--active'); stepLabel1.classList.remove('stepper__step--completed'); }
      if (stepLabel2)  stepLabel2.classList.remove('stepper__step--active');
      if (stepLine)    stepLine.classList.remove('stepper__line--completed');
    }

    function populateConfirmation() {
      var fields = ['input-line','input-machine','input-product','input-employees','input-date','input-time'];
      var labels = ['Línea','Máquina','Producto','Operarios','Fecha inicio','Hora inicio'];
      var confirmGrid = document.getElementById('confirm-grid');
      if (!confirmGrid) return;

      confirmGrid.innerHTML = '';
      fields.forEach(function (id, i) {
        var el  = document.getElementById(id);
        var val = el ? (el.options ? el.options[el.selectedIndex].text : el.value) : '—';
        var div = document.createElement('div');
        div.className = 'confirm-box__item';
        div.innerHTML = '<div class="confirm-box__label">' + labels[i] + '</div>' +
                        '<div class="confirm-box__value">' + (val || '—') + '</div>';
        confirmGrid.appendChild(div);
      });
    }

    if (nextBtn)   nextBtn.addEventListener('click', goToStep2);
    if (backBtn)   backBtn.addEventListener('click', goToStep1);

    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        /* Simulate API call */
        submitBtn.disabled = true;
        submitBtn.textContent = 'Iniciando lote...';
        setTimeout(function () {
          window.showToast && window.showToast('Lote iniciado correctamente.', 'success');
          setTimeout(function () { window.location.href = 'produccion.html'; }, 800);
        }, 1200);
      });
    }

    /* Dynamic machine options based on line */
    var lineSelect    = document.getElementById('input-line');
    var machineSelect = document.getElementById('input-machine');

    var MACHINES = {
      L1: ['M-101 Servilletera A', 'M-102 Servilletera B', 'M-103 Servilletera C'],
      L2: ['M-201 Bolseadora A', 'M-202 Bolseadora B'],
      L3: ['M-301 Troqueladora A', 'M-302 Troqueladora B', 'M-303 Troqueladora C'],
      L4: ['M-401 Pajillera A', 'M-402 Pajillera B'],
      L5: ['M-501 Vasos Termo A', 'M-502 Vasos Termo B']
    };

    if (lineSelect && machineSelect) {
      lineSelect.addEventListener('change', function () {
        var key = lineSelect.value;
        machineSelect.innerHTML = '<option value="">Seleccione máquina</option>';
        (MACHINES[key] || []).forEach(function (m) {
          var opt = document.createElement('option');
          opt.value = m;
          opt.textContent = m;
          machineSelect.appendChild(opt);
        });
      });
    }
  }

  /* --------------------------------------------------
     Supplies Management (produccion-cerrar.html)
  -------------------------------------------------- */
  function initSupplies() {
    var addBtn       = document.getElementById('btn-add-supply');
    var container    = document.getElementById('supplies-container');
    var counterEl    = document.getElementById('supplies-count');
    if (!addBtn || !container) return;

    var supplyCount = parseInt(container.querySelectorAll('.supply-row:not(.supply-row--header)').length, 10);

    function updateCount() {
      if (counterEl) counterEl.textContent = supplyCount;
    }

    function createSupplyRow() {
      supplyCount++;
      var row = document.createElement('div');
      row.className = 'supply-row';
      row.innerHTML =
        '<div class="form-field">' +
          '<input type="text" class="form-field__input" placeholder="SKU insumo">' +
        '</div>' +
        '<div class="form-field">' +
          '<input type="number" class="form-field__input" placeholder="Cantidad" min="0">' +
        '</div>' +
        '<div class="form-field">' +
          '<input type="text" class="form-field__input" placeholder="N° lote">' +
        '</div>' +
        '<div class="form-field">' +
          '<input type="text" class="form-field__input" placeholder="Proveedor">' +
        '</div>' +
        '<button class="supply-row__delete" aria-label="Eliminar insumo">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>' +
          '</svg>' +
        '</button>';

      row.querySelector('.supply-row__delete').addEventListener('click', function () {
        row.remove();
        supplyCount--;
        updateCount();
      });

      container.appendChild(row);
      updateCount();
    }

    /* Wire existing delete buttons */
    container.querySelectorAll('.supply-row__delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.closest('.supply-row').remove();
        supplyCount--;
        updateCount();
      });
    });

    addBtn.addEventListener('click', createSupplyRow);

    /* Close Batch submit */
    var closeBtn = document.getElementById('btn-close-batch');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeBtn.disabled = true;
        closeBtn.textContent = 'Cerrando lote...';
        setTimeout(function () {
          window.showToast && window.showToast('Lote cerrado correctamente.', 'success');
          setTimeout(function () { window.location.href = 'produccion.html'; }, 800);
        }, 1200);
      });
    }
  }

  /* --------------------------------------------------
     Init
  -------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initStepper();
    initSupplies();
  });

}());
