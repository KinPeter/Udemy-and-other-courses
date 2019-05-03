var guessBtn = document.getElementById("guess");
var result = document.getElementById("result");

function doAGuess(correctAnswer) {
    var guess = Math.floor(Math.random() * 6);
    
    if (guess == correctAnswer) {
        return (true);
    }
    else {
        return (false);
    }
}


guessBtn.onclick = function() {
    var myNumber = document.getElementById("myNumber").value;
    var gotIt = false;
    var numberOfGuesses = 1;
    
    while (gotIt == false) {
        if (doAGuess(myNumber) == true) {
            gotIt = true;
            result.innerHTML = "Got it! It was a " + myNumber + ". It took me " + numberOfGuesses + " guesses.";
        }
        else {
            numberOfGuesses++;
        }
    }
    
}
