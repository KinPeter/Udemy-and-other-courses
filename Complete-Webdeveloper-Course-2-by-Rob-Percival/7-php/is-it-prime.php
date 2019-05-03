<?php

if (is_numeric($_GET["number"]) && $_GET["number"] > 1 && $_GET["number"] == round($_GET["number"], 0)) {

    $i = 2;

    $isprime = true;

    while ($i < $_GET["number"]) {
        if ($_GET["number"] % $i == 0) {
            // number is not prime
            $isprime = false;
        };
        $i++;
    };

    if ($isprime) {
        echo "<p>".$i." is a prime number</p>";
    } else {
        echo "<p>".$i." is not a prime number</p>";
    };

} else if ($_GET) {
    // user submitted something, but it's not a positive whole number
    echo "Please enter a positive whole number";
}

?>

<p>Please enter a whole number</p>

<form>
    <input name="number" type="text">
    <input type="submit" value="Go!">
<form>
