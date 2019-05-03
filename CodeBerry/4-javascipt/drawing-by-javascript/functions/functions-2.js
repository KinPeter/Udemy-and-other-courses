var canvas = document.getElementById('myCanvas16');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //300

function filledStar(x,y,a) {
  context.strokeStyle = "lightpink";
  context.fillStyle = "lightpink";
  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x+a, y);
  context.lineTo(x+a/7, y+a/2);
  context.lineTo(x+a/2 ,y-a/2+(a/7));
  context.lineTo(x+a-(a/7) ,y+a/2);
  context.stroke();
  context.fill();
}

filledStar(40,50,75);
filledStar(130,120,100);
filledStar(250,220,150);
