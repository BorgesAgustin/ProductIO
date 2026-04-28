-- /sql/seeders.sql
-- Datos de prueba para el sistema - Autor: Briant Gauna

-- Actualización de contraseña para demo@productio.com a "demo"
UPDATE usuarios SET password = '$2y$10$ArYO5.Jsc/3IePAOf7Dac..3LQRWvHxpHm08uysji2JubOOnmYfSS' WHERE email = 'demo@productio.com';

-- Más fábricas de prueba
INSERT INTO fabricas (nombre, direccion) VALUES 
('Fábrica Este', 'Calle Falsa 123'),
('Fábrica Oeste', 'Av. Siempre Viva 742');

-- Usuario de prueba adicional
INSERT INTO usuarios (username, email, password, nombre) VALUES 
('tester', 'tester@productio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Usuario Tester');

-- Asignar tester a Fábrica Este (suponiendo que id es 3 tras el insert anterior)
-- Usamos una subconsulta para ser más seguros con los IDs
INSERT INTO usuario_fabricas (usuario_id, fabrica_id, rol) 
SELECT u.id, f.id, 'user' 
FROM usuarios u, fabricas f 
WHERE u.username = 'tester' AND f.nombre = 'Fábrica Este';
