<?php
    include("./connectdatabass.php");

    header("Content-Type: application/json") ; 

    session_start() ; 

    $coach_id = $_SESSION["usermpgine"] ; 
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $bio = $_POST["bio"];
    $experienceYears = $_POST["experienceYears"];
    $certifications = $_POST["certifications"];

    $sports = isset($_POST["sports"]) ? $_POST["sports"] : []; 

    $newPassword = isset($_POST["newPassword"]) ? $_POST["newPassword"] : null;
    $currentPassword = isset($_POST["currentPassword"]) ? $_POST["currentPassword"] : null;

    $insertuserprepar = $connect -> prepare('UPDATE users 
                                                    SET first_name = ?, last_name = ?, email = ? 
                                                    WHERE user_id = ?') ;
    $insertuserprepar -> execute([$firstName , $lastName , $email , $coach_id]) ;

    $deleteSports = $connect->prepare('DELETE FROM coach_sport WHERE coach_id = ?');
    $deleteSports->execute([$coach_id]);

    $insertSport = $connect->prepare('INSERT INTO coach_sport (coach_id, sport_id) VALUES (?, ?)');

    foreach ($sports as $sportId) {
        $insertSport->execute([$coach_id, $sportId]);
    }

    $profilePhotoPath = null;
    if(isset($_FILES["photo"]) && $_FILES["photo"]["error"] === 0){
        $nameProfilePhoto =  $_FILES["photo"]["name"] ; 
        $uploadDirectionProfile = "../../FRONT/IMG/PROFILESPHOTO/" . $nameProfilePhoto ;
        move_uploaded_file( $_FILES["photo"]["tmp_name"] , $uploadDirectionProfile) ;
        $profilePhotoPath = '../IMG/PROFILESPHOTO/' . $nameProfilePhoto ; 
    }

    if($profilePhotoPath){
        $insertcoashprepare = $connect->prepare('UPDATE coach_profile 
                                                SET bio = ?, experience_year = ?, certification = ?, photo = ?
                                                WHERE coach_id = ?');  
        $insertcoashprepare->execute([$bio, $experienceYears, $certifications, $profilePhotoPath, $coach_id]);
    } else {
        $insertcoashprepare = $connect->prepare('UPDATE coach_profile 
                                                SET bio = ?, experience_year = ?, certification = ?
                                                WHERE coach_id = ?');  
        $insertcoashprepare->execute([$bio, $experienceYears, $certifications, $coach_id]);
    }
    if(!empty($currentPassword) && !empty($newPassword)) {
        $checkpassword = $connect->prepare("SELECT password FROM users WHERE user_id = ?"); 
        $checkpassword->execute([$coach_id]); 
        $hashpassword = $checkpassword->fetch();

        if($hashpassword && password_verify($currentPassword, $hashpassword["password"])) {
            
            $newPassword = password_hash($newPassword, PASSWORD_DEFAULT); 
            $updatepass = $connect->prepare("UPDATE users SET password = ? WHERE user_id = ?");
            $updatepass->execute([$newPassword, $coach_id]);
            
            echo json_encode(["success" => true, "message" => "Mot de passe mis à jour avec succès"]);
        } else {
            echo json_encode(["success" => false, "message" => "Mot de passe actuel incorrect"]);
        }
        exit; 
    }

    echo json_encode(["success" => true]);
