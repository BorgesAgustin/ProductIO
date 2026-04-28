-- /sql/schema_20260428_120515.sql
-- Actualización de contraseña para el usuario demo y agregado de datos de prueba - Autor: Briant Gauna

-- Actualización de contraseña para demo@productio.com a "demo"
UPDATE usuarios SET password = '$2y$10$ArYO5.Jsc/3IePAOf7Dac..3LQRWvHxpHm08uysji2JubOOnmYfSS' WHERE email = 'demo@productio.com';

-- Datos adicionales de prueba (Seeders)
INSERT INTO fabricas (nombre, direccion) VALUES 
('Fábrica Este', 'Calle Falsa 123'),
('Fábrica Oeste', 'Av. Siempre Viva 742');

INSERT INTO usuarios (username, email, password, nombre) VALUES 
('tester', 'tester@productio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Usuario Tester');

INSERT INTO usuario_fabricas (usuario_id, fabrica_id, rol) 
SELECT u.id, f.id, 'user' 
FROM usuarios u, fabricas f 
WHERE u.username = 'tester' AND f.nombre = 'Fábrica Este';
