<?php 

    include("connectdatabass.php") ; 

    $prenom = $_POST["prenom"] ;
    $nom = $_POST["nom"] ;
    $email = $_POST["email"] ;  
    $password = $_POST["password"]; 
    $confirmPassword = $_POST["confirmPassword"] ; 
    $role = $_POST["role"] ;


    if ($_POST["password"] !== $_POST["confirmPassword"]) {
        die("Password does not match the confirmation password.");
    }

    $password = password_hash($password  , PASSWORD_DEFAULT); 

    $insertuserprepar = $connect -> prepare('INSERT INTO users (first_name , last_name , email , password , role) VALUE ( ? , ? , ? , ? , ?)') ;
    $insertuserprepar -> execute([$prenom , $nom , $email , $password , $role]) ;
    
    $selectUser = $connect -> lastInsertId() ;

    if($role == "coach") {
        $BioCoach = $_POST["BioCoach"] ; 
        $experiencecoach = $_POST["experiencecoach"] ; 
        $certificate = $_POST["certificate"] ;
        $cpecialiter = json_decode($_POST["cpecialiter"] , true ) ;

        $profilePhotoPath = '';
        if($_FILES["profilePhoto"]["error"] == 0 ){
            $nameProfilePhoto =  $_FILES["profilePhoto"]["name"] ; 
            $uploadDirectionProfile = "../../FRONT/IMG/PROFILESPHOTO/" . $nameProfilePhoto ;
            move_uploaded_file( $_FILES["profilePhoto"]["tmp_name"] , $uploadDirectionProfile) ;
            $profilePhotoPath = '../IMG/PROFILESPHOTO/' . $nameProfilePhoto ; 
        }

        $insertcoashprepare = $connect -> prepare('INSERT INTO coach_profile (coach_id , bio , experience_year , certification , photo) VALUE ( ? , ? , ? , ? , ?)') ; 
        $insertcoashprepare -> execute([$selectUser , $BioCoach , $experiencecoach , $certificate , $profilePhotoPath]) ;
    
        foreach($cpecialiter as $speciait){
            $insertintosportcoash = $connect -> prepare("INSERT INTO coach_sport (sport_id , coach_id) VALUE ( ? , ? )") ;
            $insertintosportcoash -> execute([ $speciait , $selectUser ]) ; 
        }
        
    }

    echo "success"; 
