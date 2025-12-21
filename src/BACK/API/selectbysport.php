<?php 

    include("./connectdatabass.php") ; 
     
    session_start() ; 

    header("Content-Type: application/json");

    $valuecherche = $_POST["sportselect"] ; 

    $selectbysport = $connect -> prepare("SELECT u.* , c.* 
                                       FROM users u 
                                       INNER JOIN coach_profile c ON u.user_id = c.coach_id 
                                       INNER JOIN coach_sport cs ON cs.coach_id = c.coach_id 
                                       INNER JOIN sports s ON s.sport_id = cs.sport_id 
                                       WHERE s.sport_id = ?") ; 
    $selectbysport -> execute([$valuecherche]) ;

    $result = $selectbysport -> fetchAll() ; 

    $allcoach = [] ;


    foreach($result as $evrycoash ){
        $idcoash = $evrycoash["coach_id"] ; 
        $check = $connect -> query ("SELECT s.sport_name 
                                            FROM coach_profile c
                                            INNER JOIN coach_sport cs ON cs.coach_id = c.coach_id 
                                            INNER JOIN sports s ON cs.sport_id = s.sport_id 
                                            WHERE c.coach_id = $idcoash"); 
        $sports = $check -> fetchAll() ;
        $evrycoash["sports"] = $sports ; 
        $allcoach[] = $evrycoash ;
    }

    echo json_encode($allcoach) ; 