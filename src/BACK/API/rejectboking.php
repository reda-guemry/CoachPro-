<?php
    include("./connectdatabass.php");

    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    $bookingId = $data['bookingId'] ;


    $stmt = $connect->prepare("SELECT availability_id FROM bookings WHERE booking_id = ?");
    $stmt->execute([$bookingId]);
    $booking = $stmt->fetch();

    $availabilityId = $booking['availability_id'];

    $update = $connect->prepare("UPDATE availabilites SET status = 'available' WHERE availability_id = ?");
    $update->execute([$availabilityId]);

    $delete = $connect->prepare("UPDATE bookings SET status = 'cancelled' WHERE booking_id  = ?");
    $delete->execute([$bookingId]);

    echo json_encode(["status" => "success", "message" => "Booking cancelled successfully"]);
