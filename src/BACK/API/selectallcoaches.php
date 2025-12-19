<?php   

    include("./connectdatabass.php") ; 

    header("Content-Type: application/json");

    $check = $connect -> query ("SELECT u.* , c.* from users u  inner join coach_profile c on u.user_id = c.coach_id"); 
    $result = $check -> fetchAll() ; 

    $allcoach = [] ;

    foreach($result as $evrycoash ){
        $idcoash = $evrycoash["coach_id"] ; 
        $check = $connect -> query ("SELECT c.coach_id , s.sport_name 
                                            FROM coach_profile c
                                            INNER JOIN coach_sport cs ON cs.coach_id = c.coach_id 
                                            INNER JOIN sports s ON cs.sport_id = s.sport_id 
                                            WHERE c.coach_id = $idcoash"); 
        $sports = $check -> fetchAll() ;
        $evrycoash["sports"] = $sports ; 
        $allcoach[] = $evrycoash ;
    }

    echo json_encode($allcoach) ;

