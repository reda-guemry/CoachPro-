<?php 

    $prenom = $_POST["prenom"] ;
    $nom = $_POST["nom"] ;
    $email = $_POST["email"] ; 
    $telephone = $_POST["telephone"] ; 
    $password = $_POST["password"] ; 
    $confirmPassword = $_POST["confirmPassword"] ; 
    $role = $_POST["role"] ; 

    

    if($role == "coach") {
        $BioCoach = $_POST["BioCoach"] ; 
        $experiencecoach = $_POST["experiencecoach"] ; 

        $profilePhotoPath = '';
        if($_FILES["profilePhoto"]["error"] == 0 ){
            $nameProfilePhoto =  $_FILES["profilePhoto"]["name"] ; 
            $uploadDirectionProfile = "../../FRONT/IMG/PROFILESPHOTO/" . $nameProfilePhoto ;
            move_uploaded_file( $_FILES["profilePhoto"]["tmp_name"] , $uploadDirectionProfile) ;
            $profilePhotoPath = '../IMG/PROFILESPHOTO/' + $nameProfilePhoto ; 
        }

        $certificatePhotoPath = '';
        if($_FILES["certificate"]["error"] == 0 ){
            $nameCertifPhoto = $_FILES["certificate"]["name"] ; 
            $uploadDirectionCertif = "../../FRONT/IMG/CERTIFICATEPHOTO/" . $nameCertifPhoto ;
            move_uploaded_file($_FILES["certificate"]["tmp_name"] , $uploadDirectionCertif) ; 
            $certificatePhotoPath = '../IMG/CERTIFICATEPHOTO/' . $nameCertifPhoto ; 
        }
    }
