var guessBtn = document.getElementById("guess");
var result = document.getElementById("result");


guessBtn.onclick = function() {
    var myNumber = document.getElementById("myNumber").value;
    var gotIt = false;
    var numberOfGuesses = 1;
    
    while (gotIt == false) {
        var guess = Math.floor(Math.random() * 6);
        if (guess == myNumber) {
            gotIt = true;
            result.innerHTML = "Got it! It was a " + guess + ". It took me " + numberOfGuesses + " guesses.";
        }
        else {
            numberOfGuesses++;
        }
    }
    
}
