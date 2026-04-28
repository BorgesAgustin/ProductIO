-- /sql/schema_20260428_113450.sql
-- Adición de credenciales de prueba (demo/demo) - Briant Gauna

INSERT INTO usuarios (username, email, password, nombre) 
VALUES ('demo', 'demo@productio.com', '$2y$10$Ud91qOtWwAAJydcx2Ug3GOSmaSMM80Evmc8gkRfJuazNpbBEgr4vhO', 'Usuario Demo');

-- Asignar a la fábrica 1
INSERT INTO usuario_fabricas (usuario_id, fabrica_id) 
SELECT id, 1 FROM usuarios WHERE username = 'demo';
