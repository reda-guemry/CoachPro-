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

        $profilePhotoPath = '';
        if($_FILES["profilePhoto"]["error"] == 0 ){
            $nameProfilePhoto =  $_FILES["profilePhoto"]["name"] ; 
            $uploadDirectionProfile = "../../FRONT/IMG/PROFILESPHOTO/" . $nameProfilePhoto ;
            move_uploaded_file( $_FILES["profilePhoto"]["tmp_name"] , $uploadDirectionProfile) ;
            $profilePhotoPath = '../IMG/PROFILESPHOTO/' . $nameProfilePhoto ; 
        }

        $certificatePhotoPath = '';
        if($_FILES["certificate"]["error"] == 0 ){
            $nameCertifPhoto = $_FILES["certificate"]["name"] ; 
            $uploadDirectionCertif = "../../FRONT/IMG/CERTIFICATEPHOTO/" . $nameCertifPhoto ;
            move_uploaded_file($_FILES["certificate"]["tmp_name"] , $uploadDirectionCertif) ; 
            $certificatePhotoPath = '../IMG/CERTIFICATEPHOTO/' . $nameCertifPhoto ; 
        }

        $insertcoashprepare = $connect -> prepare('INSERT INTO coach_profile (coach_id , bio , experience_year , certification , photo) VALUE ( ? , ? , ? , ? , ?)') ; 
        $insertcoashprepare -> execute([$selectUser , $BioCoach , $experiencecoach , $profilePhotoPath , $certificatePhotoPath]) ; 

    }

    echo "success"; 
