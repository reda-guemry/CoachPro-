<?php

    include("connectdatabass.php") ; 

    session_start();

    $sessionId = session_id();

    $check = $connect->prepare("SELECT * FROM sesionses WHERE sesion_id = ?");

    $check->execute([$sessionId]);

    if(!$check->fetch()) {
        session_destroy();
        echo "invalid" ;
        exit() ;  
    }else{
        echo $_SESSION["rolelogine"] ;
    }