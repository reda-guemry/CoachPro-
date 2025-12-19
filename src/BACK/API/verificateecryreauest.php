<?php

    include("connectdatabass.php") ; 

    session_start();

    if (!isset($_SESSION['usermpgine'])) {
        echo "login.html" ; 
        exit();
    }
    function requireRole($role) {
        if (!isset($_SESSION['role']) || $_SESSION['role'] !== $role) {
            echo "login.html" ; 
            exit();
        }
    }


