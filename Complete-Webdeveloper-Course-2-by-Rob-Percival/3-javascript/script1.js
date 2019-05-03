//one line comment
/*
this is a 
multiline comment
*/ 
document.getElementById("btn").onclick = function() {
    document.getElementById("text").innerHTML = "Hello Peter!"; 
}

document.getElementById("btn2").onclick = function() {
    document.getElementById("secondPar").innerHTML = document.getElementById("secondPar").innerHTML + "awesome!";
}

document.getElementById("btn3").onclick = function() {
    document.getElementById("emptyPar").innerHTML = "<h3>I was hidden, right?!</h3>";
}

document.getElementById("btn4").onclick = function() {
    document.getElementById("moreText").style.color = "red";
    document.getElementById("moreText").style.fontSize = "30px";
}

document.getElementById("red").onclick = function() {
    document.getElementById("red").style.display = "none";
}
document.getElementById("green").onclick = function() {
    document.getElementById("green").style.display = "none";
}
document.getElementById("blue").onclick = function() {
    document.getElementById("blue").style.display = "none";
}