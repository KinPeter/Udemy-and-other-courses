<?php

echo "Hello World <br>";

$name = "Peter";
$str1 = "My name is";
echo $str1." ".$name."<br>";

$myNumber = 4;
$calc = $myNumber * 31 / 97 + 4;
echo $calc;

$myBool = true;

echo "<br><br>";

$myArray = array("Rob", "Kirsten", "Tommy", "Ralphie");
$myArray[] = "Katie";
print_r($myArray);
echo "<br><br>";
echo $myArray[1];
echo "<br><br>";

$foodArray[0] = "pizza";
$foodArray[1] = "yoghurt";
$foodArray[5] = "coconut";
$foodArray["myFavourite"] = "ice cream";
print_r($foodArray);
echo "<br><br>";

$languages = array(
    "France" => "French",
    "USA" => "English",
    "Hungary" => "Hungarian");
print_r($languages);
echo "Array length: ".sizeof($languages);
echo "<br><br>";

unset($languages["France"]);
print_r($languages);
echo "Array length: ".sizeof($languages);
echo "<br><br>";



?>
