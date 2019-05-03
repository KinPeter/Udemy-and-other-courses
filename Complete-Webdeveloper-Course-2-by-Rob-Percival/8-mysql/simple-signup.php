<?php

$link = mysqli_connect("shareddb-k.hosting.stackcp.net", "usersdb-39374bb2", "userDataBase123", "usersdb-39374bb2");
//server, username, password, database name

if (mysqli_connect_error()) {
    die("There was an error connecting to the database.");
}

//only proceed if there were values
if (array_key_exists('email', $_POST) OR array_key_exists('password', $_POST)) {
    
    //if email field empty, throw message
    if ($_POST['email'] == '') {
        echo "<p>Email address is required</p>";
    
    //if password field empty, throw message
    } else if ($_POST['password'] == '') {
        echo "<p>Password is required</p>";
        
    //check if email already exists
    } else {
        $query = "SELECT id FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."'";
        $result = mysqli_query($link, $query);
        
        if (mysqli_num_rows($result) > 0) {
            echo "<p>Email address is already registered.</p>";
            
        //proceed if everything is fine so far
        } else {
            $query = "INSERT INTO users (email, password) VALUES ('".mysqli_real_escape_string($link, $_POST['email'])."', '".mysqli_real_escape_string($link, $_POST['password'])."')";
            
            if (mysqli_query($link, $query)) {
                echo "<p>You have been signed up!</p>";
                
            } else {
                echo "<p>There was a problem signing you up.</p>";
            }
        }
    } 
    
}



/*if ($result = mysqli_query($link, $query6)) {
    while ($row = mysqli_fetch_array($result)) {
        echo "<br>";
        print_r($row);
    }    
}*/

?>

<form method="post">
    <input name="email" type="text" placeholder="email address">
    <input name="password" type="text" placeholder="password">
    <input type="submit" value="Sign up">    
</form>
