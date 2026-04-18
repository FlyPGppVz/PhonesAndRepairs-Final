<?php
// backend_php/api/get_product.php
require_once 'config.php';

header('Content-Type: application/json');

$idOrSlug = $_GET['id'] ?? $_GET['slug'] ?? '';

if (empty($idOrSlug)) {
    http_response_code(400);
    echo json_encode(["error" => "ID o Slug requerido."]);
    exit;
}

// Búsqueda por ID o Slug
$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ? OR slug = ? LIMIT 1");
$stmt->execute([$idOrSlug, $idOrSlug]);
$product = $stmt->fetch();

if (!$product) {
    http_response_code(404);
    echo json_encode(["error" => "Producto no encontrado."]);
    exit;
}

$product['specifications'] = json_decode($product['specifications'], true);
$product['color_variants'] = json_decode($product['color_variants'], true);
$product['storage_variants'] = json_decode($product['storage_variants'], true);
$product['featured'] = (bool)$product['featured'];

echo json_encode($product);
?>
