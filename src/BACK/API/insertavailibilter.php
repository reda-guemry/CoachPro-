<?php 

    include("./connectdatabass.php") ; 

    session_start() ; 
     

    header("Content-Type: application/json");

    $availibiliter = json_decode(file_get_contents("php://input") , true) ; 
    
    $coach_id = $_SESSION['usermpgine'];
    $date = $availibiliter['date'];
    $start_time = $availibiliter['start'];
    $end_time = $availibiliter['end'];
    $status = $availibiliter['status'];

    $insetinavailibity = $connect->prepare("INSERT INTO availabilites (coach_id, availabilites_date, start_time, end_time, status) VALUES (?, ?, ?, ?, ?)");

    $insetinavailibity->execute([$coach_id, $date, $start_time, $end_time, $status]);

    $idinitial = $connect -> lastInsertId() ; 
    $datareponse = $connect -> query ("SELECT * FROM availabilites WHERE availability_id ='$idinitial'") ;
    $datareponse = $datareponse -> fetch() ;

    echo json_encode(["status" => "success", "message" => "Availability added" , "datainsert" => $datareponse]); 

