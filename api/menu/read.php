<?php
include_once '../config/db.php';
include_once '../models/MenuItem.php';

$database = new Database();
$db = $database->getConnection();
$item = new MenuItem($db);

$stmt = $item->getAll();
$num = $stmt->rowCount();

if ($num > 0) {
    $items_arr = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $items_arr[] = [
            "id"          => $row['id'],
            "name"        => $row['name'],
            "category"    => $row['category'],
            "price"       => $row['price'],
            "description" => $row['description'],
            "available"   => (bool)$row['available']
        ];
    }
    http_response_code(200);
    echo json_encode(["success" => true, "data" => $items_arr, "count" => $num]);
} else {
    http_response_code(200);
    echo json_encode(["success" => true, "data" => [], "count" => 0]);
}
?>
