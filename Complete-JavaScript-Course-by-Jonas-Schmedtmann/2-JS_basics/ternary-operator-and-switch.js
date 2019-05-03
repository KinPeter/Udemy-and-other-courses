/***************************************
* TERNARY OPERATOR
*/
var age = 14;

/*
if (age >= 18) {
    var drink = "beer";
} else {
    var drink = "juice";
}
all this if-else statement can be wrote in one line using the ternary operator "?" as below:
*/

var drink = age >= 18 ? "beer" : "juice"

/***************************************
* SWITCH STATEMENT
*/
var job = "instructor";

switch (job) {
    case "teacher":
    case "instructor":
        console.log("He teaches kids how to code");
        break;
    case "driver":
        console.log("He drives an uber in Lisbon");
        break;
    case "designer":
        console.log("He designs beautiful websites");
        break;
    default:
        console.log("He does something else");
}

age = 18;

switch (true) {
    case age < 13:
        console.log("He is a boy");
        break;
    case age >= 13 && age < 20:
        console.log("He is a teenager");
        break;
    case age >= 20 && age < 30:
        console.log("He is a young man");
        break;
    default:
        console.log("He is a man");
}




















