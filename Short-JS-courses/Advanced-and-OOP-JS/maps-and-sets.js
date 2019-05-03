/************************************************/
// MAPS 
let scores = new Map();
scores.set("maths", 90);
scores.set("physics", 85);
scores.set("chemistry", 80);

console.log(scores.get("maths"));

console.log(scores.size);
console.log(scores.has("maths"));

scores.delete("maths");
console.log(scores.has("maths"));

scores.clear();
console.log(scores.size);

let map = new Map([
    ["maths", 90],
    ["physics", 85],
    ["chemistry", 80]
]);

for (let key of map.keys()) {
    console.log(key, map.get(key));
};

for (let value of map.values()) {
    console.log(value);
};

for (let entry of map.entries()) {
    console.log(entry); //each entry is an array
};

for (let [k, v] of map.entries()) {
    console.log(k,v); //each entry is an array
};

/************************************************/
// SETS 
// ! Sets allow no duplicate entries!!
let set = new Set();
set.add("Angular");
set.add("Node");
set.add("Java");

for (let elem of set) {
    console.log(elem);
}
//let set = new Set(["Like", "an", "Array"]);