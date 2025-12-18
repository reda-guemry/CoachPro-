<?php

    include("./connectdatabass.php") ; 
    include("./sesionverifinevryrequi.php") ;

    $selectallbock = $connect -> query("SELECT * FROM bookings") ;
    $result = $selectallbock -> fetchAll() ; 

    echo json_encode($result) ;
