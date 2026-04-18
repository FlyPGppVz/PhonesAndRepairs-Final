-- Creación de la base de datos (Opcional, si no la creas antes en cPanel)
-- CREATE DATABASE IF NOT EXISTS db_phonesandrepair;
-- USE db_phonesandrepair;

-- Tabla de Usuarios Administradores
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de un usuario administrador por defecto
-- Usuario: admin
-- Contraseña: password123 (DEBES cambiarla luego)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY, -- Usamos un string para el ID por si vienen del formato UUID de Next.js
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    condition_status VARCHAR(50),      -- 'New', 'Refurbished', etc.
    brand VARCHAR(100),
    stock INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    main_image VARCHAR(500),
    specifications JSON,     -- Para el JSON de technical_specs e inner_features
    color_variants JSON,     -- Para el JSON de color variants
    storage_variants JSON,   -- Para el JSON de storage variants
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
