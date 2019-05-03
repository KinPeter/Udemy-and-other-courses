var btn1 = document.getElementById("textChanger");
var inpt1 = document.getElementById("textInput");
var txt1 = document.getElementById("pText");

btn1.onclick = function() {
    var textEntered = "";
    textEntered = inpt1.value;
    txt1.innerHTML = textEntered;
}