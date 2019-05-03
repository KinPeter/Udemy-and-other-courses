<?php

$error = "";
$city = "";
$weather = "";

//api key: a247a0e46401959442b87d8493cacc20

    if (array_key_exists('city', $_GET)) {
        
        //$city = str_replace(' ', '+', $_GET['city']);
        $city = urlencode($_GET['city']);
        
        $urlContents = file_get_contents("https://api.openweathermap.org/data/2.5/weather?q=" . $city . "&appid=a247a0e46401959442b87d8493cacc20");
        
        $weatherArray = json_decode($urlContents, true); 
        
        if ($weatherArray['cod'] == 200) {
        
            $weather = "The weather in " . $_GET['city'] . " is currently " . $weatherArray['weather'][0]['description'] . ". ";

            $tempInCelsius = round($weatherArray['main']['temp'] - 273);
            $weather .= "The temperature is " . $tempInCelsius . "&deg;C. Wind speed is " . $weatherArray['wind']['speed'] . "m/s.";
        
        } else {
            $error = "That city could not be found";
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

    <title>What's the weather?</title>

    <style type="text/css">
        html { 
            background: url(bg1.jpg) no-repeat center center fixed; 
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
        
        body {
            background: none;
        }
        
        .container {
            text-align: center;
            margin-top: 30vh;
            width: 500px;
        }
        
        #weather {
            margin-top: 1rem;
        }


    </style>

</head>
<body>
    <div class="container">
    
        <h1>What's the weather?</h1>
        <form>
            <div class="form-group">
                <label for="city">Please enter the name of your city</label>
                <input type="text" class="form-control" name="city" id="city" placeholder="Eg. London, Tokyo" value="<?php if (array_key_exists('city', $_GET)) { echo $_GET['city']; }?>">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div id="weather">
            <?php 
                if ($weather) {
                    echo '<div class="alert alert-success" role="alert">'.$weather.'<div>';

                }
            
                if ($error) {
                    echo '<div class="alert alert-danger" role="alert">'.$error.'<div>';

                }
            ?>
        </div>
    
    </div>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

    <script type="text/javascript">
   

    </script>
</body>
</html>