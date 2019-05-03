var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var newArray1 = [];
var newArray2 = [];

var j = 0;
var k = 0;

for (var i = 0; i < array.length; i++) {
  if (array[i] > 5) {
    newArray1[j++] = array[i];
  }
  else {
    newArray2[k++] = array[i];
  }
}

console.log('There are ' + j + ' elements in the array, which are higher than 5.' );
console.log('These are: ' + newArray1);
console.log('There are ' + k + ' elements in the array, which are lower than or equal to 5.' );
console.log('These are: ' + newArray2);
