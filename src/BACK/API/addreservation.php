<?php

    include("./connectdatabass.php") ; 
    include("./sesionverifinevryrequi.php") ;

    $datareser = json_decode(file_get_contents("php://input") , true) ; 

    $userID = $_SESSION["usermpgine"] ;
    $coachId = $datareser['coach_id'] ;
    $date = $datareser['date'] ;
    $time = $datareser['time'] ;
    $status = $datareser['status'] ;

    $modifstatuavail = $connect -> prepare("UPDATE availabilites SET status = 'booked' WHERE availability_id = ? ") ;
    $modifstatuavail -> execute([$time]) ; 

    $insertrese = $connect -> prepare("INSERT INTO bookings (sportif_id , coach_id , availability_id , status) VALUE (? , ? , ? , ?);") ; 
    $insertrese -> execute([$userID , $coachId , $time , $status]) ; 

    
    $idinitial = $connect -> lastInsertId() ; 
    $datareponse = $connect -> query ("SELECT * FROM bookings WHERE booking_id ='$idinitial'") ;
    $datareponse = $datareponse -> fetch() ;

    echo json_encode(["status" => "success", "message" => "Availability added" , "cokies " => $reponse , "datainsert" => $datareponse]); 

