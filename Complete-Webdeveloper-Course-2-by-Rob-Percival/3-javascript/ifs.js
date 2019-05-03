var inp1 = document.getElementById("inpt");
var btn1 = document.getElementById("check");
var result = document.getElementById("result");

btn1.onclick = function() {
    if (inp1.value == "magic") {
        result.innerHTML = "Correct!";
    }
    else {
        result.innerHTML = "Sorry, that's not it...";
    }
}