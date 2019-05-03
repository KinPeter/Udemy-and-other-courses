<?php

print_r($_GET);

echo "<br>Hi there ".$_GET["name"]."!";

?>

<p>What's your name?</p>

<form>
    <input name="name" type="text">
    <input type="submit" value="Go!">
<form>
