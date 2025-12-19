<?php

    include("./connectdatabass.php") ; 

    session_start() ; 
    

    $datareser = json_decode(file_get_contents("php://input") , true) ; 

    $userID = $_SESSION["usermpgine"] ;
    $coachId = $datareser['coach_id'] ;
    $date = $datareser['date'] ;
    $time = $datareser['time'] ;
    $status = $datareser['status'] ;

    $modifstatuavail = $connect -> prepare("UPDATE availabilites SET status = 'booked' WHERE availability_id = ? ") ;
    $modifstatuavail -> execute([$time]) ; 

    // $returdebug = [];
    // $returdebug["userID"] = $userID ; 
    // $returdebug["coachId"] = $coachId ; 
    // $returdebug["date"] = $date ; 
    // $returdebug["time"] = $time ; 
    // $returdebug["status"] = $status ; 

    // echo json_encode($returdebug) ; 
    // exit()



    $insertrese = $connect -> prepare("INSERT INTO bookings (sportif_id , coach_id , availability_id , status) VALUE (? , ? , ? , ?);") ; 
    $insertrese -> execute([$userID , $coachId , $time , $status]) ; 

    
    $idinitial = $connect -> lastInsertId() ; 
    $datareponse = $connect -> query ("SELECT * FROM bookings WHERE booking_id ='$idinitial'") ;
    $datareponse = $datareponse -> fetch() ;

    echo json_encode(["status" => "success", "message" => "Availability added" , "datainsert" => $datareponse]); 

