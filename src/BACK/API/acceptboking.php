<?php
    include("./connectdatabass.php");

    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    $bookingId = $data['bookingId'] ;

    $delete = $connect->prepare("UPDATE bookings SET status = 'accepted' WHERE booking_id  = ?");
    
    $delete->execute([$bookingId]);

    echo json_encode(["status" => "success", "message" => "Booking cancelled successfully"]);
