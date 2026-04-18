<?php
// backend_php/api/auth.php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["error" => "El usuario y contraseña son requeridos."]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

// Check password
if ($user && password_verify($password, $user['password_hash'])) {
    // Generate simple token (In a real app, use a real JWT library)
    $token = md5(JWT_SECRET . $user['username']);
    
    echo json_encode([
        "user" => [
            "id" => $user['id'],
            "username" => $user['username']
        ],
        "access_token" => $token
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Credenciales inválidas."]);
}
?>
