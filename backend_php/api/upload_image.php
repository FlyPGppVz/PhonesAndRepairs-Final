<?php
// backend_php/api/upload_image.php
require_once 'config.php';
verificar_auth($pdo);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Solo método POST"]);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["error" => "No se subió ninguna imagen o hubo un error."]);
    exit;
}

$file = $_FILES['image'];

// Validar que sea una imagen (MIME type simple)
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(["error" => "Tipo de archivo no permitido. Solo JPG, PNG, WEBP, GIF."]);
    exit;
}

// Directorio de destino. Asegúrate de tener una carpeta "uploads" creada en el mismo nivel o superior.
// Por ejemplo, que esté en public_html/uploads/
$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Crear nombre seguro
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$safeFileName = uniqid('img_', true) . '.' . strtolower($extension);
$targetPath = $uploadDir . $safeFileName;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    // Retornamos la URL pública (ajusta la ruta según el dominio/carpetas de tu servidor)
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $domain = $_SERVER['HTTP_HOST'];
    $publicUrl = $protocol . $domain . '/uploads/' . $safeFileName;
    
    echo json_encode(["success" => true, "url" => $publicUrl]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo guardar la imagen en el disco."]);
}
?>
