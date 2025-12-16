<?php 

    header("Content-Type: application/json") ; 
    $datasign = json_decode(file_get_contents("php://input") , true) ;

    echo json_encode($datasign) ;