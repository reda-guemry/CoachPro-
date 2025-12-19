<?php 

    include("./connectdatabass.php") ; 
     

    header("Content-Type: application/json");

    $datareponse = $connect -> query ("SELECT * FROM availabilites ") ;
    $datareponse = $datareponse -> fetchAll() ;

    echo json_encode(["status" => "success", "message" => "Availability added" , "datainsert" => $datareponse]); 