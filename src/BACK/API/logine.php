<?php 

    include("connectdatabass.php") ; 

    $email = $_POST["email"] ; 
    $password = $_POST["password"] ; 

    $selectuser = $connect -> prepare('SELECT * FROM users WHERE email = ?') ; 
    $selectuser -> execute([$email]) ; 

    $data = $selectuser -> fetch() ; 

    if($data) {
        if(password_verify($password , $data["password"])){
            echo "success" ; 
        }else {
            echo "invalid";
        }
    }else {
        echo "invalid"; 
    }

