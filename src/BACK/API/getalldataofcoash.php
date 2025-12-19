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

    $getsports = $connect->prepare("SELECT cs.sport_name 
                                           FROM coach_profile cp
                                           INNER JOIN coach_sport c ON  c.coach_id = cp.coach_id
                                           INNER JOIN sports cs ON cs.sport_id = c.sport_id 
                                           WHERE cp.coach_id = ? ");
    $getsports->execute([$coach_id]);
    $acceptedBookings["sports"] = $getsports->fetchAll();

    echo json_encode($acceptedBookings);
