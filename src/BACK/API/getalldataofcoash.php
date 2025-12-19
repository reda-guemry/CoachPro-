<?php
    include("./connectdatabass.php");

    session_start() ; 
    
    header("Content-Type: application/json");

    $coach_id = $_SESSION["usermpgine"];


    $stmt = $connect->prepare("SELECT u.* , c.* FROM users u 
        INNER JOIN coach_profile c ON c.coach_id = u.user_id
        WHERE c.coach_id = ?");
    $stmt->execute([$coach_id]);

    $acceptedBookings = $stmt->fetch();

    echo json_encode($acceptedBookings);
