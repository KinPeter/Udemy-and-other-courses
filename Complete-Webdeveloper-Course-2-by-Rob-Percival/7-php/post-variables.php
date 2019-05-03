<?php
    if ($_POST) {
        $family = array("Peter", "Cheyun", "Viktor", "Eva");
        $isKnown = false;

        foreach ($family as $value) {
            if ($value == $_POST["name"]) {
                $isKnown = true;
            };
        }
        if ($isKnown) {
            echo "Hi There ".$_POST["name"]."!";
        } else {
            echo "I don't know you.";
        };
        
    };
?>



<form method="post">
    <p>What is your name?</p>
    <input name="name" type="text">
    <input type="submit" value="Submit">
<form>
