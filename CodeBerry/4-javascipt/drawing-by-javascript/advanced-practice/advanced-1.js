var canvas = document.getElementById('myCanvas18');
var context = canvas.getContext('2d');

var cw = canvas.width;  //450
var ch = canvas.height; //350

var color = 'orange';

var a = cw / 9;
var posx = cw / 2 - a / 2;
var posy = ch / 2 - a + 0.125 * a;

var coords = [[posx, posy], //középső
              [posx, posy - 1.75 * a - 0.16 * a ],
              [posx + 1.5 * a + 0.15 * a,  posy - 0.875 * a - 0.08 * a],
              [posx + 1.5 * a + 0.15 * a,  posy + 0.875 * a + 0.08 * a],
              [posx, posy + 1.75 * a + 0.16 * a ],
              [posx - 1.5 * a - 0.15 * a,  posy + 0.875 * a + 0.08 * a],
              [posx - 1.5 * a - 0.15 * a,  posy - 0.875 * a - 0.08 * a],
];

context.strokeStyle = color;
context.fillStyle = color;

function drawHexagon(x, y, a) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + a, y);
  context.lineTo(x + a + 0.5 * a , y + 0.875 * a);
  context.lineTo(x + a, y + 0.875 * a * 2);
  context.lineTo(x, y + 0.875 * a * 2);
  context.lineTo(x - 0.5 * a, y + 0.875 * a);
  context.lineTo(x, y);
  context.stroke();
}

for (var i = 0; i <= 6; i++) {
  drawHexagon(coords[i][0], coords[i][1], a);
  if (i == 3) {
    context.fill();
  }
}
