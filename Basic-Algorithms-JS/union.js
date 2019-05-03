var array1 = [2, 3, 4, 5, 1, 10, 7, 8, 9, 6];
var array2 = [44, 5, 13, 10, 7, 12, 14, 61];
var unionArray = [];

for (var i = 0; i < array1.length; i++) {
  unionArray[i] = array1[i];
}

var k = array1.length;

for (var j = 0; j < array2.length; j++) {
  var i = 0;
  while (i < array1.length && array1[i] != array2[j]) {
    i++;
  }
  if (i >= array1.length) {
    unionArray[k++] = array2[j];
  }
}

console.log('Array #1: ' + array1);
console.log('Array #2: ' + array2);
console.log('The union array: ' + unionArray);
