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

        // Define upload directories
        $profilePhotoDir = __DIR__ . "/../../FRONT/IMG/PROFILESPHOTO/";
        $certificatePhotoDir = __DIR__ . "/../../FRONT/IMG/CERTIFICATEPHOTO/";

        // Create directories if they don't exist
        if (!file_exists($profilePhotoDir)) {
            mkdir($profilePhotoDir, 0777, true);
        }
        if (!file_exists($certificatePhotoDir)) {
            mkdir($certificatePhotoDir, 0777, true);
        }

        $profilePhotoPath = '';
        if($_FILES["profilePhoto"]["error"] == 0 ){
            $originalName = $_FILES["profilePhoto"]["name"] ; 
            $fileExtension = pathinfo($originalName, PATHINFO_EXTENSION);
            // Sanitize filename: remove spaces and special characters, use timestamp for uniqueness
            $sanitizedName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
            $nameProfilePhoto = $sanitizedName . '_' . time() . '_' . $selectUser . '.' . $fileExtension;
            $uploadDirectionProfile = $profilePhotoDir . $nameProfilePhoto ;
            
            if (move_uploaded_file($_FILES["profilePhoto"]["tmp_name"], $uploadDirectionProfile)) {
                chmod($uploadDirectionProfile, 0644);
                $profilePhotoPath = '../IMG/PROFILESPHOTO/' . $nameProfilePhoto ; 
            } else {
                error_log("Failed to upload profile photo: " . $_FILES["profilePhoto"]["error"]);
            }
        }

        $certificatePhotoPath = '';
        if($_FILES["certificate"]["error"] == 0 ){
            $originalCertifName = $_FILES["certificate"]["name"] ; 
            $fileExtension = pathinfo($originalCertifName, PATHINFO_EXTENSION);
            // Sanitize filename: remove spaces and special characters, use timestamp for uniqueness
            $sanitizedName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalCertifName, PATHINFO_FILENAME));
            $nameCertifPhoto = $sanitizedName . '_' . time() . '_' . $selectUser . '.' . $fileExtension;
            $uploadDirectionCertif = $certificatePhotoDir . $nameCertifPhoto ;
            
            if (move_uploaded_file($_FILES["certificate"]["tmp_name"], $uploadDirectionCertif)) {
                chmod($uploadDirectionCertif, 0644);
                $certificatePhotoPath = '../IMG/CERTIFICATEPHOTO/' . $nameCertifPhoto ; 
            } else {
                error_log("Failed to upload certificate photo: " . $_FILES["certificate"]["error"]);
            }
        }

        $insertcoashprepare = $connect -> prepare('INSERT INTO coach_profile (coach_id , bio , experience_year , certification , photo) VALUE ( ? , ? , ? , ? , ?)') ; 
        $insertcoashprepare -> execute([$selectUser , $BioCoach , $experiencecoach , $profilePhotoPath , $certificatePhotoPath]) ; 

    }
    echo "T9DA LGHARAD" ;