var canvas = document.getElementById('myCanvas21');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var posx = 30;
var posy = 30;
var radius = 30;
var hue = 360;
//hsla(360, 50%, 45%, 1)

function drawCircle() {
  context.strokeStyle = 'hsla(' + hue + ', 50%, 45%, 1)';
  context.beginPath();
  context.arc(posx,posy,radius,0,2*Math.PI);
  context.stroke();
}

//for (var i = 0; i < 110; i++) {
function drawTunnel() {
  while (posx < cw-radius/2) {
    drawCircle();
    context.clearRect(0, 0, cw, ch);
    hue += 360/100;
    posx += 3;
    posy += 2.3;
    radius += 2;
  }
  while (posx > radius){
    drawCircle();
    hue += 360/100;
    posx -= 3;
    posy -= 2.3;
    radius -= 2;
  }
}
var anim1 = setInterval(drawTunnel, 100);


