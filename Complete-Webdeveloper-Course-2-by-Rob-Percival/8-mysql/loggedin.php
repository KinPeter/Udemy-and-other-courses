<?php 

session_start();

if ($_SESSION['email']) {
    
    echo "You are logged in as ".$_SESSION['email']." !";

} else {
    
    header("Location: session.php");
}

?>