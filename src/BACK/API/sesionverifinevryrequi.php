<?php

    include("connectdatabass.php") ; 

    session_start();

    $sessionId = session_id();
    $reponse = "success" ; 
    $check = $connect->prepare("SELECT * FROM sesionses WHERE sesion_id = ?");

    $check->execute([$sessionId]);

    if(!$check->fetch()) {
        session_destroy();
        $reponse = "invalid" ;
        exit() ;  
    }