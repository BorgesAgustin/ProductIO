<?php
/**
 * run_migration.php
 * Script temporal para ejecutar la migración de base de datos en el servidor sin phpMyAdmin.
 */
require_once 'config/database.php';

header('Content-Type: text/plain; charset=utf-8');

echo "Iniciando migración en el servidor...\n";

$sql = "
-- 1. Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contacto VARCHAR(255),
    email VARCHAR(255),
    fabrica_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fabrica_id) REFERENCES fabricas(id) ON DELETE CASCADE
);

-- 2. Tabla de Productos (Catálogo SKU)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(100) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    familia VARCHAR(100) NOT NULL,
    gramaje FLOAT,
    color VARCHAR(50),
    descripcion TEXT,
    estado TINYINT(1) DEFAULT 1,
    fabrica_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_sku_fabrica (sku, fabrica_id),
    FOREIGN KEY (fabrica_id) REFERENCES fabricas(id) ON DELETE CASCADE
);

-- 3. Datos de prueba (Seeders) para Clientes
INSERT INTO clientes (nombre, contacto, email, fabrica_id) VALUES
('Distribuidora Gastronómica S.A.', 'Juan Pérez', 'juan@distrigastro.com', 1),
('Restaurante El Sol', 'María López', 'maria@elsol.com', 1),
('Papelera Central', 'Carlos Gómez', 'carlos@papeleracentral.com', 2),
('Cafetería Central', 'Ana Rodríguez', 'ana@cafecentral.com', 2);

-- 4. Datos de prueba (Seeders) para Productos
INSERT INTO productos (sku, nombre, familia, gramaje, color, descripcion, estado, fabrica_id) VALUES
('SERV-33-DH', 'Servilleta Doble Hoja 33x33', 'SERVILLETAS', 18.5, 'Blanco', 'Servilletas premium de papel celulosa doble hoja', 1, 1),
('PAJI-20-BIO', 'Pajita biodegradable 20cm', 'PAJITAS', 2.0, 'Verde', 'Sorbetes de papel kraft biodegradables de 20cm', 1, 1),
('BOLS-15-KRAFT', 'Bolsa de papel Kraft 15x25', 'BOLSITAS', 80.0, 'Marrón', 'Bolsas de papel kraft sin manija para panadería/delivery', 1, 2),
('VASO-08-PP', 'Vaso de polipapel 8oz', 'VASOS', 220.0, 'Blanco con logo', 'Vasos térmicos de polipapel aptos para bebidas calientes', 1, 2);
";

try {
    // Ejecutar el SQL
    $pdo->exec($sql);
    echo "¡MIGRACIÓN COMPLETADA CON ÉXITO!\n";
    echo "Las tablas 'clientes' y 'productos' fueron creadas y pobladas con datos de prueba.\n";
} catch (PDOException $e) {
    echo "ERROR AL EJECUTAR LA MIGRACIÓN:\n";
    echo $e->getMessage() . "\n";
}
?>
