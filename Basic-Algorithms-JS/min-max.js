var array = [3, 7, 3, 1, 2, 12, 7, 5];

var min = array[0];
var max = 0;

for (var i = 0; i < array.length; i++) {
  if (array[i] < min) {
    min = array[i];
  }
}

for (var i = 0; i < array.length; i++) {
  if (array[i] > max) {
    max = array[i];
  }
}

console.log('The lowest element of the array is: ' + min);
console.log('The highest element of the array is: ' + max);
