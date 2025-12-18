<?php   

    include("./connectdatabass.php") ; 
    include("./sesionverifinevryrequi.php") ; 

    header("Content-Type: application/json");

    $check = $connect -> query ("SELECT u.* , c.* from users u  inner join coach_profile c on u.user_id = c.coach_id ;"); 
    $result = $check -> fetchAll() ; 

    echo json_encode($result) ;

