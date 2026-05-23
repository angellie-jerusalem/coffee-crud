<?php
include_once '../config/db.php';
include_once '../models/MenuItem.php';

$database = new Database();
$db = $database->getConnection();
$item = new MenuItem($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $item->id = $data->id;

    if ($item->delete()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Menu item deleted."]);
    } else {
        http_response_code(503);
        echo json_encode(["success" => false, "message" => "Unable to delete item."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "ID is required."]);
}
?>
