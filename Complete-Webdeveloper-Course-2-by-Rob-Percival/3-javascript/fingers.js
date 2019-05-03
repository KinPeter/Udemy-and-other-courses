var inp1 = document.getElementById("inpt");
var btn1 = document.getElementById("check");
var result = document.getElementById("result");


btn1.onclick = function() {
    var fingers = Math.floor(Math.random() * 6)
    
    if (inp1.value == fingers) {
        result.innerHTML = "Yep, you got it! The answer was " +fingers;
    }
    else {
        result.innerHTML = "Sorry, that's not it. The answer was " + fingers;
    }
}