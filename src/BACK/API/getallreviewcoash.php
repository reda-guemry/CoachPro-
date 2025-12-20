<?php
    include("./connectdatabass.php");

    header("Content-Type: application/json");

    session_start() ; 

    $coash_id = $_SESSION["usermpgine"] ; 

    $getreview = $connect -> prepare('SELECT r.* , u.first_name , u.last_name
                                            FROM  reviews r 
                                            INNER JOIN bookings b ON b.booking_id = r.booking_id 
                                            INNER JOIN users u ON u.user_id = b.sportif_id
                                            WHERE coash_id = ? ') ;
    $getreview -> execute([$coash_id]) ;
    
    $reponse = $getreview -> fetchAll() ; 

    echo json_encode($reponse); 