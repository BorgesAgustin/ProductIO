/**
 * assets/js/login.js
 */

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const btn = this.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Verificando...';

    fetch('../api/auth/login.php', {
        method: 'POST',
        body: formData
    })
    .then(r => r.json())
    .then(res => {
        const errorEl = document.getElementById('login-error');
        if (res.success) {
            if (errorEl) errorEl.classList.remove('login-card__error--visible');
            window.ms.mostrarExito('Acceso concedido');
            setTimeout(() => {
                window.location.href = 'onboarding.php';
            }, 500);
        } else {
            if (errorEl) {
                errorEl.textContent = res.error || 'Usuario o contraseña incorrectos';
                errorEl.classList.add('login-card__error--visible');
            }
            window.ms.mostrarError(res.error || 'Credenciales incorrectas');
            btn.disabled = false;
            btn.textContent = 'Iniciar sesión';
        }
    })
    .catch(err => {
        window.ms.mostrarError('Error de red al intentar iniciar sesión');
        btn.disabled = false;
        btn.textContent = 'Iniciar sesión';
    });
});
