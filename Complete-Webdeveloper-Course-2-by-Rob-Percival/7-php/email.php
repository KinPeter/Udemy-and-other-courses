<?php
    $emailTo = "kinpeter85@gmail.com";
    $subject = "I hope this works";
    $body = "I think you're great!";
    $headers = "From: peter@ptkin.net";

    if (mail($emailTo, $subject, $body, $headers)) {
        echo "The e-mail was sent successfully";
    }
    else {
        echo "Something went wrong...";
    }

?>
