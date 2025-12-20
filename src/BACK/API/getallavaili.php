<?php 

    include("./connectdatabass.php") ; 
     
    session_start() ; 

    header("Content-Type: application/json");

    $coach_id = $_SESSION["usermpgine"];

    $datareponse = $connect -> prepare ("SELECT * FROM availabilites WHERE coach_id = ?") ;
    $datareponse -> execute([$coach_id]) ; 
    $datareponse = $datareponse -> fetchAll() ;

    echo json_encode(["status" => "success", "message" => "Availability added" , "datainsert" => $datareponse]); 