<?php 

    include("./connectdatabass.php") ; 
     
    session_start() ; 

    header("Content-Type: application/json");

    $coash_id = $_SESSION["usermpgine"]; 

    $allboking = $connect -> prepare("SELECT COUNT(*) AS total FROM bookings WHERE coach_id = ?") ; 
    $allboking -> execute([$coash_id]) ;

    $allboking = $allboking -> fetch() ;
    
    $getavrage = $connect -> prepare("SELECT AVG(r.ratting) AS average
                                             FROM reviews r
                                             INNER JOIN bookings b ON b.coach_id = ?;") ;
    $getavrage -> execute([$coash_id]) ;

    $getavrage = $getavrage -> fetch() ;

    $reponse = [
        "allboking" => $allboking["total"] , 
        "getavrage" => $getavrage["average"]
    ];


    echo json_encode($reponse) ;