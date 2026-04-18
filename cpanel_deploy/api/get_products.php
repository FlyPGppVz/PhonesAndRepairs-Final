<?php
// backend_php/api/get_products.php
require_once 'config.php';

header('Content-Type: application/json');

$stmt = $pdo->prepare("SELECT * FROM products ORDER BY created_at DESC");
$stmt->execute();
$products = $stmt->fetchAll();

// Debemos decodificar los JSONs para que el frontend de Nextjs los lea como objetos y no como strings de SQL
foreach ($products as &$product) {
    $product['specifications'] = json_decode($product['specifications'], true);
    $product['color_variants'] = json_decode($product['color_variants'], true);
    $product['storage_variants'] = json_decode($product['storage_variants'], true);
    $product['featured'] = (bool)$product['featured'];
}

echo json_encode($products);
?>
