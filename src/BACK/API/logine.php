<?php 

    include("connectdatabass.php") ; 
    
    session_start();

    $email = $_POST["email"] ; 
    $password = $_POST["password"] ; 

    $selectuser = $connect -> prepare('SELECT * FROM users WHERE email = ?') ; 
    $selectuser -> execute([$email]) ; 

    $data = $selectuser -> fetch() ; 

    if($data) {
        if(password_verify($password , $data["password"])){

            session_regenerate_id(true);

            $sesionid = session_id() ; 
            $usermpgine = $data["user_id"] ; 
            $rolelogine = $data["role"] ; 

            $insertintosesion = $connect -> prepare("INSERT INTO sesionses (sesion_id , user_id , role_user) VALUE (? , ? , ?)") ; 
            $insertintosesion -> execute([$sesionid , $usermpgine , $rolelogine]) ; 

            $_SESSION["sesion_id"] = $sesionid ; 
            $_SESSION["usermpgine"] = $usermpgine ; 
            $_SESSION["rolelogine"] = $rolelogine ; 

            echo "success" ; 
        }else {
            echo "invalid";
        }
    }else {
        echo "invalid"; 
    }
