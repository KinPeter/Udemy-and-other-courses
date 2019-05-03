<?php
    $error = "";
    $successMessage = "";

    if ($_POST) {
        if (!$_POST["inputEmail"]) {
            $error .= "An email address is required.<br>";
        }
        if (!$_POST["inputMessage"]) {
            $error .= "The content field is required.<br>";
        }
        if (!$_POST["inputSubject"]) {
            $error .= "The subject is required.<br>";
        }
        if ($_POST['inputEmail'] && filter_var($_POST["inputEmail"], FILTER_VALIDATE_EMAIL) === false) {
            $error .= "The email address is invalid.<br>";
        }

        if ($error != "") {
            $error = '<div class="alert alert-danger" role="alert"><p>There were error(s) in your form:</p>' . $error . '</div>';
        } else {
            $emailTo = "kinpeter85@gmail.com";
            $subject = $_POST['inputSubject'];
            $content = $_POST['inputMessage'];
            $headers = "From: ".$_POST['inputEmail'];

            if (mail($emailTo, $subject, $content, $headers)) {
                $successMessage = '<div class="alert alert-success" role="alert">Your message was sent, we\'ll get back to you ASAP!</div>';
            } else {
                $error = '<div class="alert alert-danger" role="alert"><p><strong>Your message couldn\'t be sent - please try again later</div>';
            }
        }
    }

?>

<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Contact Form</title>

    <style type="text/css">


    </style>

</head>
<body>
    <div class="container">
        <h1>Get in touch!</h1>

        <div id="error"><? echo $error.$successMessage; ?></div>

        <form method="post">
            <div class="form-group">
                <label for="inputEmail">Email address</label>
                <input type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div class="form-group">
                <label for="inputSubject">Subject</label>
                <input type="text" class="form-control" id="inputSubject" name="inputSubject">
            </div>

            <div class="form-group">
                <label for="inputMessage">Your message</label>
                <textarea class="form-control" id="inputMessage" name="inputMessage" rows="3"></textarea>
            </div>

            <button type="submit" id="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

    <script type="text/javascript">
        $("form").submit(function() {

            var error = "";

            if ($("#inputSubject").val() == "") {
                error += "The subject field is required.<br>";
            }
            if ($("#inputEmail").val() == "") {
                error += "The e-mail field is required.<br>";
            }
            if ($("#inputMessage").val() == "") {
                error += "The message field is required.<br>";
            }

            if (error != "") {
                $("#error").html('<div class="alert alert-danger" role="alert"><p><strong>There were error(s) in your form:</strong></p>' + error + '</div>');
                return false;

            } else {
                return true;
            }

        });

    </script>
</body>
</html>
