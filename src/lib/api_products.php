<?php
// Izinkan akses lintas asal (CORS) agar React Vite tidak diblokir oleh browser
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Matikan error kasar HTML agar tidak merusak format JSON penampung React
error_reporting(0);
ini_set('display_errors', 0);

$host = "127.0.0.1";
$username = "root";
$password = "root"; 
$database = "BumigoraTruss"; // Menyesuaikan database kapital kamu
$port = 8889; 

$conn = @new mysqli($host, $username, $password, $database, $port);

if ($conn->connect_error) {
    $password = "";
    $conn = @new mysqli($host, $username, $password, $database, $port);
    
    if ($conn->connect_error) {
        $port = 3306;
        $conn = @new mysqli($host, $username, $password, $database, $port);
        
        if ($conn->connect_error) {
            echo json_encode(["success" => false, "error" => "Koneksi database MySQL gagal."]);
            exit();
        }
    }
}

$method = $_SERVER['REQUEST_METHOD'];

// 1. JALUR GET: Ambil Data Produk
if ($method === 'GET') {
    $sql = "SELECT * FROM products ORDER BY id DESC";
    $result = $conn->query($sql);
    
    $products = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['price'] = (float)$row['price'];
            $row['stock'] = (int)$row['stock'];
            $products[] = $row;
        }
    }
    echo json_encode($products);
}

// 2. JALUR POST: Tampung dan Selamatkan Data Form dari React
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Fitur Mapping Pintar: Deteksi otomatis variabel bahasa Inggris atau Indonesia dari form kamu
    $name = isset($data['name']) ? $data['name'] : (isset($data['nama']) ? $data['nama'] : '');
    $category = isset($data['category']) ? $data['category'] : (isset($data['kategori']) ? $data['kategori'] : '');
    $price = isset($data['price']) ? $data['price'] : (isset($data['harga']) ? $data['harga'] : 0);
    $stock = isset($data['stock']) ? $data['stock'] : (isset($data['stok']) ? $data['stok'] : 0);
    
    $image_url = '';
    if (isset($data['image_url'])) {
        $image_url = $data['image_url'];
    } elseif (isset($data['image'])) {
        $image_url = $data['image'];
    } elseif (isset($data['gambar'])) {
        $image_url = $data['gambar'];
    }

    if (!empty($name)) {
        $name = $conn->real_escape_string($name);
        $category = $conn->real_escape_string($category);
        $price = (float)$price;
        $stock = (int)$stock;
        $image_url = $conn->real_escape_string($image_url);

        $sql = "INSERT INTO products (name, category, price, stock, image_url) VALUES ('$name', '$category', $price, $stock, '$image_url')";
        
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "Produk berhasil disimpan!"]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Nama produk kosong atau data form tidak terbaca."]);
    }
}

// 3. JALUR DELETE: Hapus Data Produk
if ($method === 'DELETE') {
    if (isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $sql = "DELETE FROM products WHERE id = $id";
        
        if ($conn->query($sql)) {
            echo json_encode(["success" => true, "message" => "Produk berhasil dihapus!"]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
    }
}

$conn->close();
?>