var array = [3, 4, 5, 7, 2, 1, 10];

var counter = 0;
var condition = 6;

for (var i = 0; i < array.length; i++) {
  if (array[i] > condition) {
    counter++;
  }
}

console.log('In the array, ' + counter + ' elements are higher than ' + condition);
