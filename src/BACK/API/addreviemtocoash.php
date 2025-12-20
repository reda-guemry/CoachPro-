<?php
    include("./connectdatabass.php");

    session_start() ; 


    $coash_id = $_POST["coash_id"];
    $comment = $_POST["comment"];
    $reviewBookingId = $_POST["reviewBookingId"];
    $rating = $_POST["rating"];

    $insertintoreview = $connect -> prepare("INSERT INTO reviews (booking_id , commentaire , ratting ,coash_id) VALUE ( ? , ? , ? , ? )") ; 
    $insertintoreview -> execute([$reviewBookingId , $comment , $rating , $coash_id ]) ; 

    echo "succes" ; 