var myArray = new Array();

myArray[0] = "pizza";
myArray[1] = "chocolate";

console.log(myArray);

var tweets = ["Morning everyone!", "I love coffee!"];

tweets.push("Back to work :(")

console.log(tweets);

tweets.splice(1, 1); /*delete from item index 1 and 1 item*/

console.log(tweets);

tweets.splice(1, 0, "Cornflakes are fun") /*add new item on index 1, do not delete anything*/

console.log(tweets);

tweets.splice(2, 1, "Num num") /*replace item on index 2 */

console.log(tweets);