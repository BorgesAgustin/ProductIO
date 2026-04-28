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
        if (res.success) {
            window.ms.mostrarExito('Acceso concedido');
            setTimeout(() => {
                window.location.href = 'onboarding.html';
            }, 500);
        } else {
            window.ms.mostrarError(res.error || 'Credenciales incorrectas');
            btn.disabled = false;
            btn.textContent = 'Iniciar Sesión';
        }
    })
    .catch(err => {
        window.ms.mostrarError('Error de red al intentar iniciar sesión');
        btn.disabled = false;
        btn.textContent = 'Iniciar Sesión';
    });
});
