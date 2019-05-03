var canvas = document.getElementById('myCanvas15');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //300

function triangle(x,y,a) {
  context.strokeStyle = "gray";
  context.fillStyle = "RGBa(255, 165, 0, .5)";
  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x+a/2, y+a);
  context.lineTo(x-a/2, y+a);
  context.lineTo(x,y);
  context.stroke();
  context.fill();
}

triangle(230,160,50);
triangle(270,100,50);
triangle(200,50,150);
