<?php
// backend_php/api/config.php

// Configuración de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Configuración de Base de Datos
$host = 'localhost'; // Habitualmente localhost en cPanel
$dbname = 'nombre_de_tu_base_de_datos'; // <-- CAMBIAR
$username = 'usuario_de_db'; // <-- CAMBIAR
$password = 'tu_contraseña_db'; // <-- CAMBIAR

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configurar PDO para que lance excepciones en errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión a la base de datos."]);
    exit;
}

// Clave Secreta para JWT (JSON Web Tokens) muy básico
define('JWT_SECRET', 'SuperSecretKey_ChangeMe_12345!'); // <-- CAMBIAR en producción

// Función útil para verificar autenticación simple
function verificar_auth($pdo) {
    $headers = apache_request_headers();
    $auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (empty($auth)) {
        http_response_code(401);
        echo json_encode(["error" => "No autorizado. Token faltante."]);
        exit;
    }
    
    // Aquí implementamos una validación simple del token.
    // Para simplificar sin instalar librerías externas de JWT, 
    // asumimos que el token es literal el JWT_SECRET + admin_username codificado.
    $token = str_replace('Bearer ', '', $auth);
    $expected_token = md5(JWT_SECRET . 'admin'); // Pseudo-token para facilidad en cPanel

    if ($token !== $expected_token) {
        http_response_code(401);
        echo json_encode(["error" => "No autorizado. Token inválido."]);
        exit;
    }
    return true;
}
?>
