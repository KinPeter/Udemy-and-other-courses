<?php

$link = mysqli_connect("shareddb-k.hosting.stackcp.net", "usersdb-39374bb2", "userDataBase123", "usersdb-39374bb2");
//server, username, password, database name

if (mysqli_connect_error()) {
    die("There was an error connecting to the database.");
}


$query = "SELECT * FROM users WHERE id = 2";

$query1 = "SELECT * FROM users WHERE email = 'kinpeter85@gmail.com'";

$query2 = "SELECT * FROM users WHERE email LIKE 'tommy%'";

$query3 = "SELECT * FROM users WHERE id >= 2";

$query4 = "SELECT email FROM users WHERE id = 2";

$query5 = "SELECT * FROM users WHERE id >= 2 AND email LIKE '%T%'";

$name = "Rob O'Grady";

$query6 = "SELECT email FROM users WHERE name = '".mysqli_real_escape_string($link, $name)."'";

if ($result = mysqli_query($link, $query6)) {
    while ($row = mysqli_fetch_array($result)) {
        echo "<br>";
        print_r($row);
    }    
}

?>

