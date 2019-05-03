<?php

for ($i = 10; $i >= 0; $i--) {
    echo $i."<br>";
}
echo "<br>";

$family = array("Peti", "Anyu", "Apu", "Cheyun", "Viktor", "Éva");
for ($i = 0; $i < sizeof($family); $i++) {
    echo $family[$i].", ";
}
echo "<br><br>";

foreach ($family as $key => $value) {
    echo "Array item ".$key." is ".$value."<br>";
}
echo "<br><br>";

$i = 0;
while ($i < 10) {
    echo $i.", ";
    $i++;
}
echo "<br><br>";

$i = 5;
while ($i <= 50) {
    echo $i.", ";
    $i = $i+5;
}
echo "<br><br>";

$i = 0;
while ($i < sizeof($family)) {
    echo $family[$i].", ";
    $i++;
}

?>
