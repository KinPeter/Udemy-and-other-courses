var markMass = 86;
var johnMass = 101;
var markHeight = 1.65;
var johnHeight = 1.83;
var markBMI = markMass / (markHeight * markHeight);
var johnBMI = johnMass / (johnHeight * johnHeight);
var isMarkHigher = markBMI > johnBMI;

console.log("Is Mark's BMI higher than Johns? " + isMarkHigher + " Mark's BMI is " + markBMI + " and John's BMI is " + johnBMI + ".");