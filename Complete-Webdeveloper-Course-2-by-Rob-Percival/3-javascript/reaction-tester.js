var result = document.getElementById("result");
var shape = document.getElementById("shape");
var quickestSpan = document.getElementById("quickest");
var averageSpan = document.getElementById("average");

var start = new Date().getTime();

var windowW = window.innerWidth;
var windowH = window.innerHeight;

function randomX(side) {
    var pos = -1;
    while (pos < 0) {
        pos = Math.random() * (windowW - side) 
    }
    return pos;
}

function randomY(side) {
    var pos = -1;
    while (pos < 0) {
        pos = Math.random() * (windowH - side) 
        pos -= 150;
    }
    return pos;
}

function makeShapeAppear() {
    var side = (Math.random() * 125) + 75;
    shape.style.width = side + "px";
    shape.style.height = side + "px";
    shape.style.top = randomY(side) + "px";
    shape.style.left = randomX(side) + "px";
    shape.style.display = "block";
    shape.style.backgroundColor = getRandomColor();
    if (Math.random() > 0.5) {
        shape.style.borderRadius = "50%";
    }
    else {
        shape.style.borderRadius = "0";
    }
    start = new Date().getTime();
}

function appearAfterDelay() {
    setTimeout(makeShapeAppear, Math.random() * 2000 );
}

function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


var quickest = 100;
var catches = [];

appearAfterDelay();

shape.onclick = function() {
    shape.style.display = "none";
    
    var end = new Date().getTime();
    var timeTaken = (end - start) / 1000;
    result.innerHTML = timeTaken + " sec";
    
    if (timeTaken < quickest) {
        quickest = timeTaken;
    }
    quickestSpan.innerHTML = quickest + " sec";
    
    catches.push(timeTaken);
    var sum = 0;
    for (var i = 0; i < catches.length; i++) {
        sum += catches[i];
    }
    avgCatch = (sum / catches.length).toFixed(3);
    averageSpan.innerHTML = avgCatch + " sec";
    
    appearAfterDelay();

}

