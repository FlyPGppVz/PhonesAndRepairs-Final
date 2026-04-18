<?php
// backend_php/api/admin_products.php
require_once 'config.php';

// Validar que el usuario sea administrador
verificar_auth($pdo);

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// Para POST y PUT, leer el cuerpo del JSON
$data = json_decode(file_get_contents("php://input"), true);

if ($method === 'POST') {
    // Generar un ID único simple si no viene uno (simulando UUID)
    $id = $data['id'] ?? uniqid('prod_', true);
    $featured = isset($data['featured']) && $data['featured'] ? 1 : 0;
    $stock = $data['stock'] ?? 0;

    $sql = "INSERT INTO products (
        id, title, price, slug, description, condition_status, brand, stock, featured, main_image, specifications, color_variants, storage_variants
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    try {
        $stmt->execute([
            $id,
            $data['title'],
            $data['price'],
            $data['slug'],
            $data['description'] ?? null,
            $data['condition_status'] ?? 'New',
            $data['brand'] ?? 'Apple',
            $stock,
            $featured,
            $data['main_image'] ?? null,
            json_encode($data['specifications'] ?? []),
            json_encode($data['color_variants'] ?? []),
            json_encode($data['storage_variants'] ?? [])
        ]);
        echo json_encode(["success" => true, "id" => $id]);
    } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(["error" => "Error al insertar producto. Posible slug duplicado."]);
    }
} elseif ($method === 'PUT') {
    $id = $_GET['id'] ?? $data['id'] ?? '';
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(["error" => "ID requerido para actualizar."]);
        exit;
    }

    $featured = isset($data['featured']) && $data['featured'] ? 1 : 0;
    
    $sql = "UPDATE products SET 
        title = ?, price = ?, slug = ?, description = ?, condition_status = ?, brand = ?, stock = ?, featured = ?, main_image = ?, specifications = ?, color_variants = ?, storage_variants = ?
        WHERE id = ?";
    
    $stmt = $pdo->prepare($sql);
    try {
        $stmt->execute([
            $data['title'],
            $data['price'],
            $data['slug'],
            $data['description'] ?? null,
            $data['condition_status'] ?? 'New',
            $data['brand'] ?? 'Apple',
            $data['stock'] ?? 0,
            $featured,
            $data['main_image'] ?? null,
            json_encode($data['specifications'] ?? []),
            json_encode($data['color_variants'] ?? []),
            json_encode($data['storage_variants'] ?? []),
            $id
        ]);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(["error" => "Error al actualizar. Posible slug duplicado."]);
    }
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? '';
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(["error" => "ID requerido para eliminar."]);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["success" => true]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>
