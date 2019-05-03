<?php

//setcookie("customerId", "001", time() + 60 * 60 * 24 * 2);
//creating a cookie: "name", "value", expiry date:
// (time() function gets the current time in seconds) 
// so set the expiry as current time + x seconds
// here 60*60 = 1 hour * 24 (a day) * 2 ==> 2 days

//setcookie("customerId", "", time() - 60 * 60);
//removing a cookie: we actually resetting it's expiry date to the past, e.g. minus one hour
//it will only remove the cookie only after next reload of the page


echo "stored cookie ID is ".$_COOKIE["customerId"];

?>