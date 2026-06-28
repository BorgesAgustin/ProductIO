<?php
$username = $_SESSION['nombre'] ?? 'Usuario';
$role_label = 'Operario'; 
if (isset($_SESSION['user_id'])) {
    // If admin
    if ($_SESSION['username'] === 'admin') {
        $role_label = 'Administrador';
    } else {
        $role_label = 'Operario de Línea';
    }
}
$initials = 'US';
if (isset($_SESSION['nombre'])) {
    $words = explode(' ', $_SESSION['nombre']);
    $initials = strtoupper(substr($words[0], 0, 1) . (isset($words[1]) ? substr($words[1], 0, 1) : ''));
}
?>
<aside class="sidebar" role="navigation" aria-label="Menú principal">
    <!-- Brand -->
    <a href="dashboard.php" class="sidebar__brand">
      <div class="sidebar__brand-logo">PIO</div>
      <div class="sidebar__brand-text">
        <span class="sidebar__brand-name">PRODUCT-IO</span>
        <span class="sidebar__brand-tagline">Papelera K&amp;A</span>
      </div>
    </a>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <div class="sidebar__nav-group">
        <div class="sidebar__nav-group-label">General</div>
        
        <a href="dashboard.php" class="sidebar__nav-item <?php echo basename($_SERVER['PHP_SELF']) == 'dashboard.php' ? 'sidebar__nav-item--active' : ''; ?>" id="nav-dashboard">
          <svg class="sidebar__nav-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span class="sidebar__nav-item-label">Dashboard</span>
        </a>
        
        <a href="clientes.php" class="sidebar__nav-item <?php echo basename($_SERVER['PHP_SELF']) == 'clientes.php' ? 'sidebar__nav-item--active' : ''; ?>" id="nav-clientes">
          <svg class="sidebar__nav-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
          </svg>
          <span class="sidebar__nav-item-label">Clientes</span>
        </a>
        
        <a href="productos.php" class="sidebar__nav-item <?php echo basename($_SERVER['PHP_SELF']) == 'productos.php' ? 'sidebar__nav-item--active' : ''; ?>" id="nav-productos">
          <svg class="sidebar__nav-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l2-1.14"/>
            <path d="M16.5 9.4L7.55 4.24M3.29 7L12 12l8.71-5"/><path d="M12 22V12"/>
          </svg>
          <span class="sidebar__nav-item-label">Productos</span>
        </a>
      </div>
      
      <div class="sidebar__nav-group">
        <div class="sidebar__nav-group-label">Configuración</div>
        <a href="onboarding.php" class="sidebar__nav-item">
          <svg class="sidebar__nav-item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
          <span class="sidebar__nav-item-label">Cambiar Fábrica</span>
        </a>
      </div>
    </nav>

    <!-- User info -->
    <div class="sidebar__footer">
      <div class="sidebar__user-avatar"><?php echo $initials; ?></div>
      <div class="sidebar__user-info">
        <div class="sidebar__user-name"><?php echo htmlspecialchars($username); ?></div>
        <div class="sidebar__user-role"><?php echo $role_label; ?></div>
      </div>
      <a href="../api/auth/logout.php" class="btn btn--ghost btn--icon" title="Cerrar sesión" style="color:rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </a>
    </div>
</aside>

<div class="app__main">
    <!-- Header -->
    <header class="header" role="banner">
      <div class="header__left">
        <button class="header__menu-btn" aria-label="Abrir menú">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <nav class="header__breadcrumb" aria-label="Migas de pan">
          <span>PRODUCT-IO</span>
          <span>›</span>
          <span class="header__breadcrumb-current"><?php 
            $pages_titles = [
                'dashboard.php' => 'Dashboard',
                'clientes.php' => 'Clientes',
                'productos.php' => 'Productos'
            ];
            echo $pages_titles[basename($_SERVER['PHP_SELF'])] ?? 'Inicio';
          ?></span>
        </nav>
      </div>

      <div class="header__right">
        <div class="header__user">
          <div class="header__user-avatar"><?php echo $initials; ?></div>
          <span class="header__user-name"><?php echo htmlspecialchars($username); ?></span>
        </div>
      </div>
    </header>
    
    <main class="app__content">
