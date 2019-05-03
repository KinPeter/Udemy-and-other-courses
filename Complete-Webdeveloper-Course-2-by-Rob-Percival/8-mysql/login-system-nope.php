<?php

//starting session for later "stay logged in"
session_start();

$error = "";

// check if the user returns to the page with the "logout" flag
// if yes, unset the session, remove the cookie
if (array_key_exists("logout", $_GET)) {
    unset($_SESSION);
    setcookie("id", "", time() - 60*60);
    $_COOKIE["id"] = "";    
} else if ((array_key_exists("id", $_SESSION) AND $_SESSION['id']) OR (array_key_exists("id", $_COOKIE) AND $_COOKIE['id'])) {
    // check if they are already logged in, if yes, redirect to logged in page
    header("Location: login-system-logged-in-page.php");
}

if (array_key_exists("submit", $_POST)) {
    
    //connect to database and check the connection
    $link = mysqli_connect("shareddb-k.hosting.stackcp.net", "usersdb-39374bb2", "userDataBase123", "usersdb-39374bb2");
    if (mysqli_connect_error()) {
    die("There was an error connecting to the database.");
}
    //data validation - check if all fields entered
    if (!$_POST['email']) {
        $error .= "- An e-mail address is required<br>";
    }
    
    if (!$_POST['password']) {
        $error .= "- A password is required<br>";
    }
    
    if ($error != "") {
        $error = "There were errors in your form:<br>".$error;
    } else {
        
        //check the hidden signUp variable, and if we need to sign up or log in
        if ($_POST['signUp'] == "1") {
            
        //======================================================================
        //    SIGN UP procedure starts here

            //check whether the e-mail address is taken already
            $query = "SELECT id FROM users WHERE email = '".mysqli_real_escape_string($link, $_POST['email'])."' LIMIT 1";
            $result = mysqli_query($link, $query);
            if (mysqli_num_rows($result) > 0) {
                $error = "That e-mail address is already taken.";
            } else {

                //if everything is fine, we sign up the user
                $query = "INSERT INTO users (email, password) VALUES ('".mysqli_real_escape_string($link, $_POST['email'])."', '".mysqli_real_escape_string($link, $_POST['password'])."')";
                //...with checking if the update to database was successful            
                if (!mysqli_query($link, $query)) {
                    $error = "Could not sign you up.";
                } else {
                    $error = "Sign up successful!";

                    //creating safe password hash and update in the database
                    $currentId = mysqli_insert_id($link); //will add it as a "salt"
                    //$hashId = password_hash($currentId, PASSWORD_DEFAULT);
                    $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    $query = "UPDATE users SET password = '" . $hash . "' WHERE id = " . $currentId . " LIMIT 1";
                    mysqli_query($link, $query);

                    //setting session id as current id and if stay logged in is checked, creating a cookie
                    $_SESSION['id'] = $currentId;
                    if ($_POST['stayLoggedIn'] == '1') {
                        setcookie("id", $currentId, time() + 60 * 60 * 24 * 7);

                        //redirect the user to the logged in page
                        header("Location: login-system-logged-in-page.php");
                    }
                }
            }
        }
        //     end of SIGN UP procedure    
        //============================================================================
        
       
        else {
        //======================================================================
        //     LOG IN procedure starts here            
            // check if user's email is in the database
            $query = "SELECT * FROM users WHERE email = '" . mysqli_real_escape_string($link, $_POST['email']) . "'";
            $result = mysqli_query($link, $query);
            $row = mysqli_fetch_array($result);
            if (isset($row)) {
                
                //$newHashId = password_hash($row['id'], PASSWORD_DEFAULT);
                $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    
                if ($hashedPassword == $row['password']) {
                    $error = "Password check successful";
                    $_SESSION['id'] = $row['id'];
                    
                    if ($_POST['stayLoggedIn'] == '1') {
                        setcookie("id", $row['id'], time() + 60 * 60 * 24 * 7);
                    }
                    header("Location: login-system-logged-in-page.php");
                    
                } else {
                    $error = "Email/password combination could not be found.";
                }
                
            } else {
                $error = "Email/password combination could not be found.";
            }
            
            
        }
        //     end of LOG IN procedure    
        //============================================================================
        
    } //end of "if there is no error" conditional
}

?>

<div id="error"><?php echo $error; ?></div>

<form method="post">
    <input type="email" name="email" placeholder="Your email">
    <input type="password" name="password" placeholder="Your password">
    <input type="checkbox" name="stayLoggedIn" value=1>
    <input type="hidden" name="signUp" value="1"> <!--hidden variable to see if the user signs up or just logging in - thus we do not need different form for login-->
    <input type="submit" name="submit" value="Sign up!">
</form>

<form method="post">
    <input type="email" name="email" placeholder="Your email">
    <input type="password" name="password" placeholder="Your password">
    <input type="checkbox" name="stayLoggedIn" value=1>
    <input type="hidden" name="signUp" value="0">
    <input type="submit" name="submit" value="Log in!">
</form>