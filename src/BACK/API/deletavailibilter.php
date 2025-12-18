<?php
    include("./connectdatabass.php");
    include("./sesionverifinevryrequi.php");

    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    $availId = $data['availId'] ;


    $stmt = $connect->prepare("DELETE FROM availabilites WHERE availability_id = ?");
    $stmt -> execute([$availId]) ; 

    echo json_encode(["status" => "success", "message" => "Booking cancelled successfully"]);
