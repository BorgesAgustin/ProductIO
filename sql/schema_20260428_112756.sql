-- /sql/schema_20260428_112756.sql
-- Archivo inicial de base de datos - Briant Gauna



CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fabricas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuario_fabricas (
    usuario_id INT,
    fabrica_id INT,
    rol VARCHAR(50) DEFAULT 'admin',
    PRIMARY KEY (usuario_id, fabrica_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (fabrica_id) REFERENCES fabricas(id) ON DELETE CASCADE
);

INSERT INTO usuarios (username, email, password, nombre) VALUES ('admin', 'admin@productio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador');
INSERT INTO fabricas (nombre, direccion) VALUES ('Fábrica Norte', 'Ruta 9 Km 200'), ('Fábrica Sur', 'Parque Industrial A');
INSERT INTO usuario_fabricas (usuario_id, fabrica_id) VALUES (1, 1), (1, 2);
