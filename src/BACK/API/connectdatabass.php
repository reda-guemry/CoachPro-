<?php 

    try {

        $connect = new PDO("mysql:host=localhost;dbname=coachpro;charset=utf8" , 
        "root" , 
        "root") ;

        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connect->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    }catch(PDOException $e){
        die("Connection failed: " . $e -> getMessage()) ;
    }