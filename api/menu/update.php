<?php
include_once '../config/db.php';
include_once '../models/MenuItem.php';

$database = new Database();
$db = $database->getConnection();
$item = new MenuItem($db);

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id) && $data->id !== '' &&
    !empty($data->name) &&
    !empty($data->category) &&
    isset($data->price) && $data->price >= 0
) {
    $item->id          = $data->id;
    $item->name        = $data->name;
    $item->category    = $data->category;
    $item->price       = $data->price;
    $item->description = $data->description ?? "";
    $item->available   = isset($data->available) ? (int)$data->available : 1;

    if ($item->update()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Menu item updated."]);
    } else {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Unable to update item."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data. ID, name, category, and price are required."]);
}
?>
