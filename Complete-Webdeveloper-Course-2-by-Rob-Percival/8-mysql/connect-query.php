<?php

$link = mysqli_connect("shareddb-k.hosting.stackcp.net", "usersdb-39374bb2", "userDataBase123", "usersdb-39374bb2");
//server, username, password, database name

if (mysqli_connect_error()) {
    die("There was an error connecting to the database.");
}

$query = "SELECT * FROM users";

if ($result = mysqli_query($link, $query)) {
    $row = mysqli_fetch_array($result);
    print_r($row);
}

echo "<br>E-mail is: ".$row['email']." and your password is: ".$row['password'];

?>

