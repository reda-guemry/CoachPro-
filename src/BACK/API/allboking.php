<?php

    include("./connectdatabass.php") ; 

    session_start() ;
    

    header("Content-Type: application/json") ;

    $sportif_id = $_SESSION["usermpgine"] ;


    $selectallbock = $connect -> prepare ("SELECT u.first_name , u.last_name , b.booking_id , b.status , a.availabilites_date , a.start_time , a.end_time
                                                FROM users u 
                                                INNER JOIN bookings b ON u.user_id = b.coach_id 
                                                INNER JOIN availabilites a ON a.availability_id = b.availability_id
                                                WHERE b.sportif_id = ?") ;

    $selectallbock -> execute(["$sportif_id"]) ;
    $result = $selectallbock -> fetchAll() ; 

    echo json_encode($result) ;
