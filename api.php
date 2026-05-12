<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 1. Database Configuration
$host = 'localhost';
$db   = 'iapl_leads';
$user = 'root'; // Default XAMPP/WAMP username
$pass = '';     // Default XAMPP password is empty

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

// 2. Handle Preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
// Simple routing based on URL segments
$parts = explode('/', trim(parse_url($requestUri, PHP_URL_PATH), '/'));
$resource = end($parts); // 'leads' or 'users'

// If there's an ID (e.g., api.php/leads/5)
$id = null;
if (is_numeric($resource)) {
    $id = $resource;
    $resource = $parts[count($parts) - 2];
}

$input = json_decode(file_get_contents('php://input'), true);

// 3. API Logic
switch ($resource) {
    case 'leads':
        if ($method === 'GET') {
            if ($id) {
                $stmt = $pdo->prepare("SELECT * FROM leads WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode($stmt->fetch());
            } else {
                $stmt = $pdo->query("SELECT * FROM leads ORDER BY id DESC");
                echo json_encode($stmt->fetchAll());
            }
        } elseif ($method === 'POST') {
            $sql = "INSERT INTO leads (slNo, date, mktBy, customerName, industryType, location, contactName, contactNumber, emailId, existingProduct, existingVendor, currentServices, requireNewProduct, requireCapacity, requireServices, iaplProfileStatus, proposalStatus, leadStatus, discussionSummary, nextActionPlan, nextActionDate, submittedByUser) 
                    VALUES (:slNo, :date, :mktBy, :customerName, :industryType, :location, :contactName, :contactNumber, :emailId, :existingProduct, :existingVendor, :currentServices, :requireNewProduct, :requireCapacity, :requireServices, :iaplProfileStatus, :proposalStatus, :leadStatus, :discussionSummary, :nextActionPlan, :nextActionDate, :submittedByUser)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($input);
            $input['id'] = $pdo->lastInsertId();
            echo json_encode($input);
        } elseif ($method === 'PATCH') {
            unset($input['id']); // Don't update the ID
            $fields = [];
            foreach ($input as $key => $value) { $fields[] = "$key = :$key"; }
            $sql = "UPDATE leads SET " . implode(', ', $fields) . " WHERE id = :id";
            $input['id'] = $id;
            $stmt = $pdo->prepare($sql);
            $stmt->execute($input);
            echo json_encode(["status" => "updated"]);
        } elseif ($method === 'DELETE') {
            $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "deleted"]);
        }
        break;

    case 'users':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT id, username, password, role, name, active FROM users");
            echo json_encode($stmt->fetchAll());
        } elseif ($method === 'POST') {
            $sql = "INSERT INTO users (username, password, role, name, active) VALUES (:username, :password, :role, :name, :active)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($input);
            $input['id'] = $pdo->lastInsertId();
            echo json_encode($input);
        } elseif ($method === 'PATCH') {
            $id = $input['id'];
            unset($input['id']);
            $fields = [];
            foreach ($input as $key => $value) { $fields[] = "$key = :$key"; }
            $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = :id";
            $input['id'] = $id;
            $stmt = $pdo->prepare($sql);
            $stmt->execute($input);
            echo json_encode(["status" => "updated"]);
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? null;
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "deleted"]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Resource not found"]);
        break;
}
?>
