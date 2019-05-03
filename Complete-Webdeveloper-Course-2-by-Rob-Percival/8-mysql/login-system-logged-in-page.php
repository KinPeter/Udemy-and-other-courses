<?php

session_start();

// check if there is a cookie set, if yes, set the session id to the cookie id
if (array_key_exists("id", $_COOKIE)) {
    $_SESSION['id'] = $_COOKIE['id'];
}

// check if there is a session id - which means they are logged in
if (array_key_exists("id", $_SESSION)) {
    echo "Logged in <br> <a href='login-system.php?logout=1'>Log out</a>";
} else {
    header("Location: login-system.php");
}


?>