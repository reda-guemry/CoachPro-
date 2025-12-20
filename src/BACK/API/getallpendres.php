<?php
    include("./connectdatabass.php");

    session_start() ; 

    header("Content-Type: application/json");

    $sportif_id = $_SESSION["usermpgine"];



    $stmt = $connect->prepare("SELECT  b.booking_id, b.status, u.first_name, u.last_name, a.availabilites_date, a.start_time, a.end_time
        FROM bookings b
        INNER JOIN users u ON u.user_id = b.sportif_id
        INNER JOIN availabilites a ON a.availability_id = b.availability_id
        WHERE b.coach_id = ?
        AND b.status = 'pending'
    ");
    $stmt->execute([$sportif_id]);

    $pendingBookings = $stmt->fetchAll();

    echo json_encode($pendingBookings);