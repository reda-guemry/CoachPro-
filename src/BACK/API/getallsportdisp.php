<?php
    
    include("./connectdatabass.php");

    header("Content-Type: application/json") ; 

    $selectsport = $connect -> query("SELECT * FROM sports") ;
    $reponse = $selectsport -> fetchAll() ; 

    echo json_encode($reponse) ; 


    